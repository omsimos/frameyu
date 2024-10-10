/* eslint-disable @next/next/no-img-element */

import { NextRequest, NextResponse } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export async function POST(req: NextRequest) {
  try {
    const { id, position, scale, frameUrl, photoUrl } = await req.json();

    const svg = await satori(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={photoUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
          alt="Photo"
        />
        <img
          src={frameUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          alt="Frame"
        />
      </div>,
      {
        width: 1000,
        height: 1000,
        fonts: [],
      },
    );

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1000,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="frameyu-${id}.png"`,
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
