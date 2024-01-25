// StickyButton.js
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../Home/WaStickyButton/StickyButton.module.css'; // Create a CSS module for styling

const StickyButton = () => {
    return (
        <a href="https://wa.me/971523524928" target="_blank" className={styles.stickyButton}>
            <FontAwesomeIcon icon={faWhatsapp} />
        </a>
    );
};

export default StickyButton;