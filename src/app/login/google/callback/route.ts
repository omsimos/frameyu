import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

import prisma from "@/lib/db";
import { google, lucia } from "@/lib/auth";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const googleUser: GoogleUser = await googleUserResponse.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        googleId: googleUser.sub,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    const usernameId = generateIdFromEntropySize(5);

    const newUser = await prisma.user.create({
      data: {
        googleId: googleUser.sub,
        username: `${googleUser.given_name.split(" ").join("").toLowerCase()}_${usernameId}`,
        image: googleUser.picture,
        email: googleUser.email,
      },
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  } catch (err: any) {
    console.log(err);
    if (err instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  given_name: string;
  picture: string;
  email: string;
}
