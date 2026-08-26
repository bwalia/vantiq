import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — 30-Day Lead Generation Trial for care homes`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Rendered at build time so the image can be emitted by a static export. */
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbf7f1",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              height: 3,
              background: "linear-gradient(to right, #cf8b60, #ead4c0 45%, #fbf7f1)",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 20,
              letterSpacing: 4,
              color: "#b5643a",
              textTransform: "uppercase",
            }}
          >
            Meta advertising for care homes
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#1b1512",
              fontWeight: 700,
            }}
          >
            30-Day&nbsp;<span style={{ color: "#b5643a" }}>Lead</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#1b1512",
              fontWeight: 700,
            }}
          >
            Generation Trial
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#6d6054" }}>
            Our fee is £0. You pay only for the ads, direct to Meta.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#1b1512",
          }}
        >
          <div style={{ display: "flex", fontWeight: 700, letterSpacing: -1 }}>vantiq</div>
          <div style={{ display: "flex", color: "#6d6054", fontSize: 22 }}>
            No contract · No auto-renewal
          </div>
        </div>
      </div>
    ),
    size,
  );
}
