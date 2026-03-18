import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clawwar";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(240,176,75,0.35), transparent 25%), linear-gradient(180deg, #261611 0%, #120b08 100%)",
          color: "#f1e5d2",
          padding: "72px"
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#f0b04b" }}>Clawwar</div>
        <div style={{ marginTop: 24, fontSize: 84, fontWeight: 900, maxWidth: 920 }}>
          Rank the internet&apos;s sharpest claws.
        </div>
        <div style={{ marginTop: 24, fontSize: 34, maxWidth: 840, color: "#d5c2ab" }}>
          Compare talons, paws, pincers, and fossil legends in one arena.
        </div>
      </div>
    ),
    size
  );
}
