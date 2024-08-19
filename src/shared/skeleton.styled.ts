import styled, { keyframes } from 'styled-components';

export const skeletonLoaderAnimation = keyframes`
   0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ddd 25%, #eee 50%, #ddd 75%);
  position: relative;
  background-color: var(--bg);
  overflow: hidden;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--glare-bg);
    transform: translateX(-100%);
    animation: ${skeletonLoaderAnimation} 3s infinite linear;

    z-index: 1;
  }
`;
