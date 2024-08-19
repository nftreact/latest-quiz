'use client';

import { useState } from 'react';
import { FaPause } from 'react-icons/fa6';
import { FaPlay } from 'react-icons/fa6';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import ReactPlayer from 'react-player';
import { AppFlex } from '@/primitives';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('rc-slider').then((item) => item.default), {
  ssr: false,
});

/**
 * props
 * _______________________________________________________________________________
 */
type played = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
} | null;

const AudioPlayer = ({ voice }: { voice: string }) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [audioPlayer, setAudioPlayer] = useState<any>();
  const [lineBarValue, setLinebarValue] = useState<any>();
  const [progress, setProgress] = useState<played>(null);

  const [player, setPlayer] = useState({
    playing: false,
    duration: 0,
    seeking: false,
    handlePlay: function () {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        playing: true,
      }));
    },
    handleSeeking: function (seeking: boolean) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        seeking: seeking,
      }));
    },
    handleDuration: function (duration: number) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        duration: duration,
      }));
    },
    handlePause: function () {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        playing: false,
      }));
    },
    handlePlayPause: function () {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        playing: !prevPlayer.playing,
      }));
    },
  });

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleDuration = (duration: number) => {
    player.handleDuration(duration);
  };

  const handleProgress = (played: played) => {
    setProgress(played);
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root justify='center' align='center'>
      <PlayPauseContainer justify='center' align='center'>
        <IconContainer justify='center' align='center' onClick={() => player.handlePlayPause()}>
          {player.playing ? <FaPause /> : <FaPlay />}
        </IconContainer>
      </PlayPauseContainer>
      <Divider>
        <div className='s1' />
        <div className='s2' />
      </Divider>
      <LineBarProgressContainer align='center'>
        <ReactPlayer
          onProgress={handleProgress}
          url={voice}
          onDuration={handleDuration}
          playing={player.playing}
          onPause={player.handlePause}
          onPlay={player.handlePlay}
          style={{ display: 'none' }}
          onReady={(Player: any) => {
            setAudioPlayer(Player);
          }}
          controls
        />
        <Slider
          min={0}
          max={player.duration}
          value={player.seeking ? lineBarValue : progress?.playedSeconds}
          onAfterChange={(value) => {
            audioPlayer?.seekTo(value);
            player.handleSeeking(false);
          }}
          onChange={(value: any) => {
            player.handleSeeking(true);
            setLinebarValue(value);
            setProgress({
              playedSeconds: value,
              loaded: 1,
              loadedSeconds: 0,
              played: 0,
            });
          }}
        />
      </LineBarProgressContainer>
    </Root>
  );
};

export default AudioPlayer;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  margin-block: 20px;
  height: 60px;
  direction: ltr;
  border-radius: 50px;
`;

const PlayPauseContainer = styled(AppFlex)`
  width: 60px;
  background-color: #4ed09a;
  height: 100%;
  border-radius: 50px 35px 35px 50px;
`;

const IconContainer = styled(AppFlex)`
  border-radius: 150px;
  background-color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const LineBarProgressContainer = styled(AppFlex)`
  width: calc(100% - 75px);
  background-color: #4ed09a;
  padding: 10px 17px;
  min-height: 100%;
  border-radius: 35px 50px 50px 35px;

  .rc-slider-track {
    margin-top: -3px;
    height: 10px;
    background: #fff;
    opacity: 90%;
  }

  & .rc-slider-rail {
    margin-top: -3px;
    height: 10px;
    background: #fff;
    opacity: 50%;
  }

  & .rc-slider-handle {
    background-color: #fff;
    border: 1px solid #fff;
    z-index: 10;
    width: 20px;
    height: 20px;
    margin-top: -8px;
    opacity: 1 !important;
    box-shadow: 0 2px 6px rgb(36 36 36 / 45%), 0 12px 24px rgb(36 36 36 / 20%);
  }
`;

const Divider = styled.section`
  width: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #4ed09a;

  .s1 {
    background-color: white;
    width: 15px;
    height: 24px;
    border-radius: 0px 0px 15px 15px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .s2 {
    background-color: white;
    width: 15px;
    height: 24px;
    border-radius: 15px 15px 0px 0px;
    position: absolute;
    bottom: -1px;
    left: 0;
    z-index: 10;
  }
`;
