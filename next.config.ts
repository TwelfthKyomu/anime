import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: ['./src/styles'],
        additionalData: `@use "sass:math"; @use "@/styles/abstracts" as *;`,
        silenceDeprecations: ['legacy-js-api'],
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
