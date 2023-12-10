import Link from 'next/link'
import styles from './Nav.module.css'

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.home}>
                Connor McCarl
            </Link>
            <Link href="/bio" className={styles.bio}>
                Bio
            </Link>
        </nav>
    )
}

export default Nav