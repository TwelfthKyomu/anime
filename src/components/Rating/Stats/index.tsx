import { FC } from "react";
import styles from "@/components/Rating/Rating.module.scss";
import Stars from "@/components/Rating/Stats/Stars";

const Stats: FC = () => {
    
    const stats = [
        {label: 'Сюжет', rating: 4.5},
        {label: 'Графика', rating: 4.5},
        {label: 'Звук', rating: 4.5},
        {label: 'Персонажи', rating: 4.5},
    ]
    
    return (
        <ul className={ styles.descriptionRating }>
            { stats.map((item, index) => (
                <li
                    key={ index }
                    className={ styles.ratingItem }>
                    <span>{ item.label }</span>
                    <Stars rating={ item.rating }/>
                    <span className={ styles.ratingEstimation }>
                        { item.rating }
                    </span>
                </li>
            )) }
        </ul>
    
    );
}

export default Stats;