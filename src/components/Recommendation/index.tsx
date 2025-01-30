import { FC } from "react";
import styles from './Recommendation.module.scss';
import Image from "next/image";
import Link from "next/link";
import SVG from "@/utils/SVG";
import Solo from "@public/image/img.png";
import Solo1 from "@public/image/img_1.png"


const Recommendation: FC = () => {
    return (
        <div className={ styles.recommendation }>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo1 }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
            <div className={ styles.recommendationItem }>
                <Image
                    src={ Solo }
                    alt="anime"
                />
                <Link
                    href='/'
                    className={ styles.recommendationAction }
                >
                    <SVG name="play"/>
                </Link>
            </div>
        </div>
    )
}

export default Recommendation;