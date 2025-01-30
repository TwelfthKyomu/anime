import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `$var: red;`,
        silenceDeprecations: ['legacy-js-api'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });
        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*).mp4',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'video/mp4',
                    },
                ],
            },
        ];
    }
};

export default nextConfig;
