import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import YouTube from 'react-youtube';
import styles from './PlayerModal.module.css';

const GET_VIDEO_INFO = gql`
  query VideoInfo($videoId: String!) {
    video(videoId: $videoId) {
      timestamp
    }
  }
`;

function PlayerModal({ videoId, playerState }) {
  const navigate = useNavigate();
  const autoPlay = false;
  const [preview, setPreview] = useState(false);

  const { loading, error, data } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: videoId },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    // console.log(`${loading}`);
    return <p>Keep Hovering On Player</p>;
  }
  if (error) {
    console.log(`${error}`);
    return <p>error to render....</p>;
  }

  const opts = {
    width: 416,
    height: 234,
    playerVars: {
      // autoPlay => true: 자동재생
      // disablekb => true: 플레이어 컨트롤 block
      // controls => 0: 플레이어 컨트롤 unvisible
      autoplay: autoPlay,
      start: data.video.timestamp,
      disablekb: true,
      controls: 0,
      mute: 1,
    },
  };

  function playerOnReady(e) {
    if (!playerState) {
      return e.target.stopVideo();
    }
    if (e.target.getPlayerState() === -1) {
      return setPreview(true);
    }
    return e.target.playVideo();
  }

  const goToDetail = videoId => {
    navigate(`/video/${videoId}`);
  };

  return (
    <section className={styles.PlayerModalArea}>
      {!preview ? (
        <section
          className={styles.CoverVideo}
          onClick={() => goToDetail(videoId)}
        ></section>
      ) : (
        <section className={styles.BlockVideo}>
          <p>현재 페이지에서 재생할 수 없는 영상입니다.</p>
          <p>영상을 보고싶으시다면 하단에 링크를 클릭해주세요.</p>
          <a href={`https://youtube.com/watch?v=${videoId}`}>Go To watch!</a>
        </section>
      )}

      <YouTube
        className={styles.YTPlayer}
        videoId={videoId}
        opts={opts}
        onReady={playerOnReady}
      />
    </section>
  );
}

export default PlayerModal;
