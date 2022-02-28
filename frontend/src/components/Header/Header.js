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
  const {
    data: videoData,
    loading,
    error,
  } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: 1 },
    fetchPolicy: 'network-only',
  });

  let youtubeId;

  if (videoData) {
    youtubeId = videoData?.video.youtubeId;
  }

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
              <Link to={`/video/${youtubeId}`}>react-youtube</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/react/${youtubeId}`}>using-layer</Link>
            </li>
            <li className={styles.navMenu}>
              <Link to={`/player/${youtubeId}`}>react-player</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
