/**
 * Build next/image remotePatterns from env so Medusa-hosted (or CDN) product
 * images load when COMMERCE_ADAPTER=medusa. Phase 1 (local placeholders) needs none.
 */
function remotePatterns() {
  const patterns = [];
  const hosts = [
    process.env.MEDUSA_BACKEND_URL,
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    process.env.NEXT_PUBLIC_MEDUSA_IMAGE_URL, // optional S3/MinIO/CDN base
  ].filter(Boolean);

  for (const raw of hosts) {
    try {
      const u = new URL(raw);
      patterns.push({ protocol: u.protocol.replace(":", ""), hostname: u.hostname });
    } catch {
      // ignore malformed env value
    }
  }
  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: remotePatterns(),
  },
};

export default nextConfig;
