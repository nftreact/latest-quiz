export type TypoVariant = {
  size: {
    initial: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  }

  weight: {
    initial: 'light' | 'regular' | 'medium' | 'bold'
  }
}

export const typoVariant: Record<string, TypoVariant> = {
  title1: {
    size: {
      initial: '6',
    },
    weight: {
      initial: 'medium',
    },
  },

  title2: {
    size: {
      initial: '5',
    },
    weight: {
      initial: 'medium',
    },
  },

  body1: {
    size: {
      initial: '4',
    },
    weight: {
      initial: 'medium',
    },
  },

  body2: {
    size: {
      initial: '3',
    },
    weight: {
      initial: 'regular',
    },
  },

  description1: {
    size: {
      initial: '2',
    },
    weight: {
      initial: 'medium',
    },
  },
  description2: {
    size: {
      initial: '1',
    },
    weight: {
      initial: 'regular',
    },
  },
}
