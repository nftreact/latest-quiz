'use client';

import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';

// Define the props type, extending the props of the BottomSheet component
type AppBottomSheetProps = React.ComponentProps<typeof BottomSheet> & {
  children: React.ReactNode;
  dismissBottomSheet?: () => void;
  title?: string;
  isShowHeader?: boolean;
};

// Forward ref to the BottomSheet component
const AppBottomSheet = React.forwardRef<any, AppBottomSheetProps>(
  ({ children, dismissBottomSheet, isShowHeader = true, title, ...props }, forwardedRef) => (
    <BottomSheetStyle ref={forwardedRef as any} {...props}>
      {children}
    </BottomSheetStyle>
  ),
);

AppBottomSheet.displayName = 'AppBottomSheet';

export default AppBottomSheet;

const BottomSheetStyle = styled(BottomSheet)`
  overflow: scroll;
`;
