import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';
import * as gQuery from '../../Global_Queries';

// function List() {
//   const GET_LIST = gql`
//     query GetList {
//       videos {
//         videoId
//         title
//         thumbnails
//         category
//         description
//       }
//     }
//   `;

//   const { loading, error, data } = useQuery(GET_LIST);
//   if (loading) return <p>Loading....</p>;
//   if (error) {
//     console.log(error);
//     return <p>Error To Render</p>;
//   }

//   return (
//     <section className={styles.ListArea}>
//       <section className={styles.ThumbnailList}>
//         {data?.videos.map((data, index) => (
//           <Thumbnail
//             // title={data.title}
//             thumbnails={data.thumbnails}
//             videoId={data.videoId}
//             key={index}
//           />
//         ))}
//       </section>
//     </section>
//   );
// }

function List() {
  const [index, setIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [list, setList] = useState('');

  const { loading, error, data } = useQuery(gQuery.GET_LIST_PAGINATION, {
    variables: { limit: parseInt(limit), index: parseInt(index) },
  });

  if (loading) <p>Loading....</p>;
  if (error) <p>Error To Render....</p>;

  return (
    <section className={styles.listArea}>
      <section className={styles.widthPagination}>
        {data?.videoPagination.map((data, index) => (
          <Thumbnail
            // title={data.title}
            thumbnails={data.thumbnails}
            videoId={data.videoId}
            key={index}
          />
        ))}
      </section>
    </section>
  );
}

export default List;
