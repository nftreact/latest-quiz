"use client"

import { colors } from '@/theme';
import React from 'react';
import ReactLoading from 'react-loading';

type Props = {};

const loading = (props: Props) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactLoading color={colors.secondary} type='spin' width={50} height={50} />
    </div>
  );
};

export default loading;
