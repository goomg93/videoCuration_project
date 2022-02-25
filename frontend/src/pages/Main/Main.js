import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './Main.module.css';

function Main() {
  const index = 1;
  const limit = 10;

  const { loading, error, data, fetchMore, hasMore } = useInfiniteScroll(
    index,
    limit
  );
  console.log(data);
  console.log(error);
  console.log(loading);

  return (
    <section className={styles.MainArea}>
      {data?.videoPagination.map((data, index) => (
        <Thumbnail
          className={styles.Thumbnail}
          thumbnails={data.thumbnails}
          videoId={data.videoId}
          key={index}
        />
      ))}
    </section>
  );
}

export default Main;
