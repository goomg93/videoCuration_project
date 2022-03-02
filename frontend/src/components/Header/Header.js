import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styles from './Header.module.css';

const GET_VIDEO_INFO = gql`
  query Video($videoId: Int) {
    video(id: $videoId) {
      youtubeId: videoId
    }
  }
`;

const Header = () => {
  const [youtubeId, setYoutubeId] = useState();
  const {
    data: videoData,
    loading,
    error,
  } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: 1 },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (videoData && !loading && !error) {
      setYoutubeId(videoData?.video.youtubeId);
    }
  }, [videoData, loading, error]);

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
              <Link to="/verticalscroll">scroll</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to="/playlist">playlist</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/video/${youtubeId}`}>react-youtube</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/layer/${youtubeId}`}>using-layer</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/chat/${youtubeId}`}>chat</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
