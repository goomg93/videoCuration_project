import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import YouTube from 'react-youtube';
import styles from './PlayerModal.module.css';
import * as gQuery from '../../../Global_Queries';
// import { useDispatch, useSelector } from 'react-redux';

function PlayerModal({ videoId, playerHandler, ppreview, setPpreview }) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const autoPlay = false;
  // const preview = useSelector(state => state.ListStates.preview);

  const { loading, error, data } = useQuery(gQuery.GET_VIDEO_INFO, {
    variables: { videoId: videoId },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <p className={styles.LoadingAndError} />;
  }
  if (error) {
    return console.log(error);
    // return <p className={styles.LoadingAndError}>error to render....</p>;
  }

  const opts = {
    width: 288,
    height: 162,
    playerVars: {
      // autoPlay => true: 자동재생
      // disablekb => true: 플레이어 컨트롤 block
      // controls => 0: 플레이어 컨트롤 unvisible
      autoplay: autoPlay,
      start: data.video.listTimestamp,
      disablekb: true,
      controls: 0,
      mute: 1,
    },
  };

  function playerOnReady(e) {
    if (e.target.getPlayerState() === -1) {
      // return dispatch({ type: 'PlayerModal/setPreview', payload: false });
      return setPpreview(false);
    }

    return e.target.playVideo();
  }

  const goToDetail = videoId => {
    if (data.video.listTimestamp > 0) return navigate(`/video/playlist`);
    else return navigate(`/video/youtube/${videoId}`);
  };

  return (
    <>
      <section className={styles.PlayerModalArea}>
        <YouTube
          className={styles.YTPlayer}
          videoId={videoId}
          opts={opts}
          onReady={playerOnReady}
        />
      </section>
      {ppreview ? (
        <section
          className={styles.CoverVideo}
          onClick={() => goToDetail(videoId)}
          onMouseLeave={playerHandler}
        />
      ) : (
        <section className={styles.BlockVideo} onMouseLeave={playerHandler}>
          <p className={styles.Block}>
            해당페이지에서 재생이 불가능한 영상입니다.
          </p>
          <p className={styles.SecondBlock}>
            재생을 원하시면 아래 링크를 클릭해주세요.
          </p>
          <a href={`https://youtube.com/watch?v=${videoId}`}>Go To watch!</a>
        </section>
      )}
    </>
  );
}

export default PlayerModal;
