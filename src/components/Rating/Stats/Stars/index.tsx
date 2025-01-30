import { FC, memo } from "react";
import SVG from "@/utils/SVG";
import { STATS } from "@/constants/Stars";
import styles from './Stars.module.scss';

type StarsT = {
    rating: number;
    count?: number;
}

const Stars: FC<StarsT> = memo((props) => {
    const {rating , count = 5} = props;
    const flooredRating = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    const getStarClass = (index: number) => {
        if (index < flooredRating) return styles.fullStar;
        if (index === flooredRating && hasHalfStar) return styles.halfStar;
        return styles.star;
    };
    
    const renderStar = (index: number) => (
        <div
            key={ index }
            className={ getStarClass(index) }>
            <SVG name="star" />
            { index === flooredRating && hasHalfStar && <SVG name="star" /> }
        </div>
    );
    
    return (
        <div className={ styles.stars }>
            { Array.from({ length: count }, (_, index) => renderStar(index)) }
        </div>
    );
});

Stars.displayName = 'Stars';

export default Stars;