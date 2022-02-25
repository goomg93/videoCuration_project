import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.logo}>
          <Link to="/">BZZNBYD</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/main">home</Link>
            </li>
            <li>
              <Link to="/video/s0sR8CA44eA">react-youtube</Link>
            </li>
            <li>
              <Link to="/react/s0sR8CA44eA">react-player</Link>
            </li>
            <li>
              <Link to="/player/s0sR8CA44eA">using-layer</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
