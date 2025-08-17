import { Link } from 'react-router-dom';
import winteraiLogo from "../../assets/winterai_logo_t.png"
import styles from "./FooterInfo.module.css";


interface FooterInfoProps {
    needsBottomPixels: boolean;
}

export const FooterInfo = ({ needsBottomPixels = false }: FooterInfoProps) => {

    return (
        <footer
            className={`${styles.footer} ${needsBottomPixels ? styles.bottomPixels : ''}`}
        >
            <div
                className={styles.imageWrapper}
            >
                <img src={winteraiLogo} alt="logo" />
            </div>
            <div
                className={styles.footerContainer}
            >
                <div
                    className={styles.section}
                >
                    <Link className={styles.sectionHeader}>Platform</Link>
                    <Link className={styles.sectionLink}>Career</Link>
                    <Link className={styles.sectionLink}>Financial</Link>
                    <Link className={styles.sectionLink}>Entertainment</Link>
                    <Link className={styles.sectionLink}>Security</Link>
                </div>
                <div
                    className={styles.section}
                >
                    <Link className={styles.sectionHeader}>Testimonials</Link>
                    <Link className={styles.sectionLink}>Angie</Link>
                    <Link className={styles.sectionLink}>Bob</Link>
                    <Link className={styles.sectionLink}>Frank</Link>
                    <Link className={styles.sectionLink}>Tom</Link>
                    <Link className={styles.sectionLink}>Susan</Link>
                </div>
                <div
                    className={styles.section}
                >
                    <Link className={styles.sectionHeader}>Developer</Link>
                    <Link className={styles.sectionLink}>Documentation</Link>
                    <Link className={styles.sectionLink}>API Keys</Link>
                    <Link className={styles.sectionLink}>Blog</Link>
                    <Link className={styles.sectionLink}>Projects</Link>
                </div>
                <div
                    className={styles.section}
                >
                    <Link className={styles.sectionHeader}>Company</Link>
                    <Link className={styles.sectionLink}>Contact</Link>
                    <Link className={styles.sectionLink}>About Us</Link>
                    <Link className={styles.sectionLink}>Careers</Link>
                    <Link className={styles.sectionLink}>Impact</Link>
                </div>
            </div>
        </footer>
    )
}