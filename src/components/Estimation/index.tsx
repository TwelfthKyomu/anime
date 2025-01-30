import { FC } from "react";
import styles from "@/components/Estimation/Estimation.module.scss";

type EstimationT = {
    rating?: number
    position?: "left" | "right"
}

const Estimation:FC<EstimationT> = (props) => {
    const {} = props
    return (
        <div className={ styles.estimation }>
            <h3 style={ {pointerEvents: "none"} }>8,5/10</h3>
        </div>
    )
}

export default Estimation;