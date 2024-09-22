"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { utapi } from "@/server/uploadthing";
import { actionClient } from "@/lib/safe-action";

export async function deleteImg(imgUrl?: string) {
  if (imgUrl) {
    try {
      await utapi.deleteFiles(imgUrl.substring(imgUrl.lastIndexOf("/") + 1));
    } catch (err) {
      console.log(err);
    }
  }
}

const publishFrameSchema = z.object({
  title: z.string(),
  handle: z.string(),
  caption: z.string().optional(),
  imgUrl: z.string(),
});

export const publishFrame = actionClient
  .schema(publishFrameSchema)
  .action(async ({ parsedInput: { title, handle, caption, imgUrl } }) => {
    const { session } = await getSession();

    if (!session) {
      throw new Error("You must be signed in to perform this action");
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

      await deleteImg(imgUrl);

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return {
            error: "Frame handle already exists",
          };
        }
      }

      return {
        error: "Error creating frame",
      };
    }

    revalidatePath("/dashboard");
    return redirect("/dashboard");
  });

const editFrameSchema = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  caption: z.string(),
});

export const editFrame = actionClient
  .schema(editFrameSchema)
  .action(async ({ parsedInput: { id, title, handle, caption } }) => {
    const { session } = await getSession();

    if (!session) {
      throw new Error("You must be signed in to perform this action");
    }

    try {
      await prisma.frame.update({
        where: {
          id,
        },
        data: {
          title,
          caption,
        },
      });
    } catch (err) {
      console.log(err);
      return {
        error: "Error editing frame",
      };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/f/${handle}`);
  });

const unpublishFrameSchema = z.object({
  id: z.string(),
  imgUrl: z.string(),
});

export const unpublishFrame = actionClient
  .schema(unpublishFrameSchema)
  .action(async ({ parsedInput: { id, imgUrl } }) => {
    const { session } = await getSession();

    if (!session) {
      throw new Error("You must be signed in to perform this action");
    }

    await deleteImg(imgUrl);

    try {
      await prisma.frame.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      return {
        error: "Error unpublishing frame",
      };
    }

    revalidatePath("/dashboard/[slug]", "layout");

    return {
      success: true,
    };
  });
