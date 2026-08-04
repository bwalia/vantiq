import type { NextConfig } from "next";

/**
 * Two build modes.
 *
 * Default: a normal Next server build. The enquiry Route Handler is live at
 * /api/enquiries.
 *
 * NEXT_STATIC_EXPORT=true: a static export for GitHub Pages. Pages serves files,
 * not a Node server, so there is nowhere for a POST handler to run. Narrowing
 * pageExtensions drops `route.node.ts` out of the route graph, which removes the
 * API from the build declaratively — rather than deleting source files in CI.
 * The form then posts to NEXT_PUBLIC_ENQUIRY_ENDPOINT instead (see src/lib/site.ts).
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

/** e.g. "/vanitq" for a GitHub project page. Empty for a custom domain. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  pageExtensions: isStaticExport ? ["ts", "tsx"] : ["node.ts", "ts", "tsx"],

  ...(isStaticExport
    ? {
        output: "export",
        // Pages has no image optimiser.
        images: { unoptimized: true },
        // Emits /path/index.html, so deep links resolve without rewrite rules.
        trailingSlash: true,
      }
    : {}),

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
