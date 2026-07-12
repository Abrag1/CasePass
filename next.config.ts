import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives inside OneDrive, whose sync service intermittently locks
  // files under .next and breaks builds (EBUSY). Overriding the dist dir lets a
  // one-off build sidestep a held lock: NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
