import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1>
          <Link to="/">BUZZANDBEYOND</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/video/RYwmjinI14s">react-youtube</Link>
            </li>
            <li>
              <Link to="/react/RYwmjinI14s">react-player</Link>
            </li>
            <li>
              <Link to="/player/RYwmjinI14s">using-layer</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
