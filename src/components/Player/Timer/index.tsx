import styles from './Timer.module.scss'

const Timer = () => {
    return (
        <div className={ styles.timer }>
            <span className={ styles.timeCurent }>0:00</span>
            <span className={ styles.timeSeparator }>/</span>
            <span className={ styles.timeDuration }>00:00</span>
        </div>
    );
}

export default Timer;