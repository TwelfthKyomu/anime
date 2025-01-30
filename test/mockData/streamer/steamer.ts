export const streamer = {
    Streamer: {
        req: {
            headers: {
                range: "bytes=0-"
            },
            query: {
                video: "video.mp4"
            }
        },
        res: {
            status: (code: number) => {
                return {
                    send: (message: string) => {
                        return message;
                    }
                };
            },
            writeHead: (code: number, headers: object) => {
                return headers;
            }
        }
    },
}