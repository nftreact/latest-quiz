export interface GlobalVariables {
  language: string
  baseurl: string
  basePath: '/fa' | '/en' | '/it' | string
  project: string
  locale: 'fa_IR' | 'en_US' | 'it_IT' | string
  direction: 'rtl' | 'ltr' | string
  calendarLocale: 'fa' | 'en' | 'it' | string
  metaTitle: string
  termsUrl: string
  privacyUrl: string
  metaDescription: string
  logoUrl: string
  faviconUrl: string
  input: {
    isShowFootUnit: boolean
  }
  colors: {
    primary: string
    secondary: string
    text: string
    muted: string
    box: string
    border: string
    background: string
  }
  input_question: {
    height_fa: {
      indicator: string
      unit: string
      error_message: string
      min_height: string
      max_height: string
    }
    weightCurrent_fa: {
      indicator: string
      unit: string
      error_message: string
      min_height: string
      max_height: string
    }
    weightGoal_fa: {
      indicator: string
      unit: string
      error_message: string
      min_height: string
      max_height: string
    }
  }
  menuItems: {
    title: string
    path: string
    icon?: JSX.Element
  }[]
  messages: {
    errors: {
      general: string
      connection: string
      authorization: string
      input: {
        default: string
        empty: string
        email: string
      }
      notFound: {
        title: string
        description: string
        button: string
      }
    }
  }
  googleAnalyticsID?: string
}
