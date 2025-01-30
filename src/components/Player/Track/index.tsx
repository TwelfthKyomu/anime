import { FC, useEffect, useState } from "react";

type TrackT = {
    lang: string,
    src: string
}

const Track:FC<TrackT> = (props) => {
    const {lang, src} = props;
    
    const [subtitles, setSubtitles] = useState([
        { lang: 'ru', src: '/subs/ru.vtt' },
        { lang: 'en', src: '/subs/en.vtt' }
    ]);
    
    return (
        <track
            kind="subtitles"
            src={ subtitles[0].src }
            srcLang={ subtitles[0].lang }
            label="Русский"
        />
    )
}

export default Track;