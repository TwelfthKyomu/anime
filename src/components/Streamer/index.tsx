import { FC } from "react";
import path from "node:path";
import * as fs from "node:fs";

type StreamerT = {
    req: any,
    res: any
}

const Streamer: FC<StreamerT> = (props) => {
    const { req, res } = props
    
    const range = req.headers.range;
    if (!range) return res.status(400).send('Requires Range header');
    
    const videoPath = path.join(process.cwd(), 'videos', req.query.video as string);
    const videoSize = fs.statSync(videoPath).size;
    
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
    };
    
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    
    return (
        <div>
            <h1>Streamer</h1>
        </div>
    );
}

export default Streamer;