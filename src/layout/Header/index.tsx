import Link from "next/link";
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={ styles.header }>
            <nav className={ styles.nav }>
                <ul className={styles.navMenu}>
                    <li>
                        <Link href="/public">
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link href="/public">
                            Для вас
                        </Link>
                    </li>
                    <li>
                        <Link href="/public">
                            Топ
                        </Link>
                    </li>
                    <li>
                        <Link href="/live">
                            В прямом эфире
                        </Link>
                    </li>
                </ul>
                <Link href="/public">Войти</Link>
            </nav>
        </header>
    )
}

export default Header;