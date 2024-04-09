"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia, getSession } from "@/lib/auth";
import { utapi } from "@/server/uploadthing";
import { z } from "zod";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function logout(): Promise<ActionResult> {
  const { session } = await getSession();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}

export async function deleteImg(fileKey?: string) {
  if (fileKey) {
    await utapi.deleteFiles(fileKey);
  }
}

const frameSchema = z.object({
  title: z.string(),
  handle: z.string(),
  caption: z.string(),
  imgUrl: z.string(),
});

export async function publishFrame({
  title,
  handle,
  caption,
  imgUrl,
}: {
  title: string;
  handle: string;
  caption?: string;
  imgUrl: string;
}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }

  const validatedFields = frameSchema.safeParse({
    title,
    handle,
    caption,
    imgUrl,
  });

  if (!validatedFields.success) {
    return {
      error: "Error validating fields",
    };
  }

  try {
    await prisma.frame.create({
      data: {
        title,
        handle,
        caption,
        imgUrl,
        userId: session.userId,
      },
    });
  } catch (err) {
    console.log(err);

    await deleteImg(imgUrl.substring(imgUrl.lastIndexOf("/") + 1));

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          error: "Frame handle already exists",
        };
      }
    }

    throw new Error("Failed to publish frame");
  }

  redirect("/dashboard");
}
