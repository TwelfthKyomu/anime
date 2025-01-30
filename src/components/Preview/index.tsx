import styles from './Preview.module.scss'
import Link from "next/link";
import SVG from "@/utils/SVG";
import VideoThumbnail from './VideoThumbnail';
import Estimation from "@/components/Estimation";
import Rating from "@/components/Rating";

const Preview = () => {
    return (
        <div className={ styles.preview }>
            <VideoThumbnail
                videoSrc="/preview/720_1695120426.mp4"
                width={ 640 }
                height={ 360 }
            />
            <div className={ styles.previewDescription }>
                <div className={ styles.previewName }>
                    <Link href="/">
                        <h1 className={ styles.previewTitle }>Полное исследование</h1>
                        <h2 className={ styles.previewOriginalTitle }>Zenshuu</h2>
                    </Link>
                    <Estimation/>
                </div>
                <div className={ styles.previewActions }>
                    <Rating/>
                    <div className={ styles.previewFavorite }>
                        <SVG name="heart"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview;