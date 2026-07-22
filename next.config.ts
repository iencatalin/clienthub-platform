import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./src/generated/prisma/**/*'],
  },

  devIndicators: false,
};

export default withNextIntl(nextConfig);
