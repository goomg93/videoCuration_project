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
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/">BACK</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
