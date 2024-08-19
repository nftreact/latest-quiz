'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {};

const LoadingSkeletonSlider = (props: Props) => {
  return <SkeletonContainer className='styled' />;
};

export default LoadingSkeletonSlider;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div`
  min-height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 3s infinite linear;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  margin: auto;
  margin-block: 20px;
`;
