import { NextRequest, NextResponse } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export async function POST(req: NextRequest) {
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
      />
    </div>,
    {
      width: 1280,
      height: 1280,
      fonts: [],
    },
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new NextResponse(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="frameyu-${id}.png"`,
    },
  });
}
