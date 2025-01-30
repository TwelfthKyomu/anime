import { FC } from "react";
import SVG from "@/utils/SVG";
import styles from './Rating.module.scss'
import Stats from "@/components/Rating/Stats";

type RatingT = {
    position?: "left" | "right"
}

const Rating: FC<RatingT> = (props) => {
    return (
        <div className={ styles.rating }>
            <span>Рейтинг</span>
            <div className={ styles.ratingArrow }>
                <SVG name='arrow-down'/>
            </div>
            <Stats/>
        </div>
    )
}

export default Rating;