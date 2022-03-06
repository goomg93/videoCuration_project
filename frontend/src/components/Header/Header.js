import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDataFetch from '../../hooks/useDataFetch';
import styles from './Header.module.css';

const Header = () => {
  const [youtubeId, setYoutubeId] = useState();
  const { loading, error, data } = useDataFetch.useFirstVideoId();

  useEffect(() => {
    if (data && !loading && !error) {
      setYoutubeId(data?.video.youtubeId);
    }
  }, [data, loading, error]);

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.logo}>
          <Link to="/">BZZNBYD</Link>
        </h1>
        <nav>
          <ul>
            <li className={styles.navMenu}>
              <Link to="/">home</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to="/verticalscroll">infinite-scroll</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to="/video/playlist">live-now</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/video/youtube/${youtubeId}`}>just-watch</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
