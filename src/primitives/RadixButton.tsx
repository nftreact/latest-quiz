'use client'

import React, { ForwardedRef } from 'react'

import { Button } from '@radix-ui/themes'
import { styled } from 'styled-components'

type AppButtonProps = React.ComponentProps<typeof Button> & {
  children: React.ReactNode
}

const { colors } = global.config

const RadixButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ children, ...props }: AppButtonProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => (
    <ButtonStyle ref={forwardedRef as any} {...props}>
      {children}
    </ButtonStyle>
  ),
)

RadixButton.displayName = 'Button'

export default RadixButton

const ButtonStyle = styled(Button)`
  &.rt-Button:where(.rt-r-size-4):where(.rt-variant-soft) {
    border-radius: 12px;
    background-color: ${colors.secondary} !important;
    padding: 12px 20px;
    margin: 0;
    color: ${colors.box};
    max-height: 42px;
  }

  &.rt-BaseButton:where(.rt-variant-soft):where([data-disabled]) {
    background-color: ${colors.border} !important;
    color: ${colors.muted};
  }
`
