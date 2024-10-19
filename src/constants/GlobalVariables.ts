const PROJECT = 'matcha'
const LOCALE = 'fa_IR'
// const LOCALE = 'en_US'

const VARIABLES = {
  matcha: {
    fa_IR: {
      language: 'fa',
      locale: 'fa_IR',
      project: PROJECT.toUpperCase(),
      baseurl: 'https://matchadiet.com/process/v2',
      basePath: '/fa',
      direction: 'rtl',
      calendarLocale: 'fa',
      metaTitle: 'ماچا | کاهش وزن پایدار و اصلاح سبک زندگی',
      termsUrl: 'https://matchadiet.com/terms.html',
      privacyUrl: 'https://matchadiet.com/privacy.html',
      metaDescription: 'کاهش وزن پایدار و اصلاح سبک زندگی',
      logoUrl: 'https://api.matchadiet.com/files/icon/logo.png',
      faviconUrl: 'https://matchadiet.com/files/icon/favicon.ico',
      input_question: {
        height_fa: {
          indicator: 'سانتی‌متر (CM)',
          unit: 'CM',
          error_message: 'قد باید بین ۹۰ تا ۲۴۰ باشد',
          min_height: '90',
          max_height: '240',
        },
        weightCurrent_fa: {
          indicator: '(KG) کیلوگرم',
          unit: 'KG',
          error_message: 'وزن باید بین ۴۰ تا ۲۴۰ باشد',
          min_height: '40',
          max_height: '240',
        },
        weightGoal_fa: {
          indicator: '(KG) کیلوگرم',
          unit: 'KG',
          error_message: 'وزن باید بین ۴۰ تا ۲۴۰ باشد',
          min_height: '40',
          max_height: '240',
        },
      },
      colors: {
        primary: '#37CAA5',
        secondary: '#E76D85',
        text: '#214A40',
        muted: '#888888',
        box: '#FFFFFF',
        border: '#EFEFEF',
        background: '#F6F8FA',
      },
      input: {
        isShowFootUnit: false,
      },
      menuItems: [
        {
          title: 'صفحه اصلی',
          path: 'https://matchadiet.com/',
        },
        {
          title: 'حساب کاربری',
          path: 'https://telegram.me/matchasupport',
        },
        {
          title: 'پشتیبانی',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'کانال تلگرام',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خرید اشتراک',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خروج از حساب',
          path: 'https://about.matchadiet.com/',
        },
      ],
      messages: {
        errors: {
          general: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
          connection: 'لطفا از اتصال به اینترنت مطمئن شوید',
          authorization: 'لطفا پیش از ادامه وارد شوید',
          input: {
            default: 'لطفا دقت کنید',
            empty: 'این فیلد نمی تواند خالی باشد',
            email: 'لطفا یک آدرس ایمیل معتبر وارد کنید',
          },
          notFound: {
            title: 'صفحه مورد نظر یافت نشد',
            description: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
            button: 'بازگشت به صفحه اصلی',
          },
          success: {
            enter: 'شما با موفقیت وارد شدید',
            out: 'شما از حساب خود خارج شدید',
            submit: 'عملیات با موفقیت ثبت شد',
          },
        },
      },
      googleAnalyticsID: '',
    },
    en_US: {
      baseurl: 'https://panel.mint-family.com',
      basePath: '/en',
      project: PROJECT.toUpperCase(),
      locale: 'en_US',
      direction: 'ltr',
      calendarLocale: 'en',
      metaTitle: 'Matcha | Your AI Coach. The Future of Fitness is Here',
      termsUrl: 'https://matchadiet.com/terms.html',
      privacyUrl: 'https://matchadiet.com/privacy.html',
      metaDescription: 'Matcha | Your AI Coach. The Future of Fitness is Here',
      logoUrl: 'https://matchadiet.com/files/icon/logo.png',
      faviconUrl: 'https://matchadiet.com/files/icon/favicon.ico',
      colors: {
        primary: '#37CAA5',
        secondary: '#E76D85',
        text: '#214A40',
        muted: '#888888',
        box: '#FFFFFF',
        border: '#EFEFEF',
        background: '#F6F8FA',
      },
      input: {
        isShowFootUnit: false,
      },
      menuItems: [
        {
          title: 'صفحه اصلی',
          path: 'https://matchadiet.com/',
        },
        {
          title: 'حساب کاربری',
          path: 'https://telegram.me/matchasupport',
        },
        {
          title: 'پشتیبانی',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'کانال تلگرام',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خرید اشتراک',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خروج از حساب',
          path: 'https://about.matchadiet.com/',
        },
      ],
      messages: {
        errors: {
          general: 'It seems there is a problem. Please try again or contact the site administrator.',
          connection: 'Please make sure you are connected to the internet.',
          authorization: 'Please log in before continuing.',
          input: {
            default: 'Please be careful.',
            empty: 'This field cannot be empty.',
            email: 'Please enter a valid email address.',
          },
          notFound: {
            title: 'Page Not Found',
            description:
              'The requested page was not found. You can return to the home page by clicking the button below.',
            button: 'Return to Home Page',
          },
          success: {
            enter: 'You have successfully logged in.',
            out: 'You have successfully logged out.',
            submit: 'Operation was successfully registered.',
          },
        },
      },
      googleAnalyticsID: '',
    },
    it_IT: {
      baseurl: 'https://panel.mint-family.com',
      basePath: '/it',
      project: PROJECT.toUpperCase(),
      locale: 'it_IT',
      direction: 'ltr',
      calendarLocale: 'it',
      metaTitle: 'Matcha | Your AI Coach. The Future of Fitness is Here',
      termsUrl: 'https://matchadiet.com/terms.html',
      privacyUrl: 'https://matchadiet.com/privacy.html',
      metaDescription: 'Matcha | Your AI Coach. The Future of Fitness is Here',
      logoUrl: 'https://matchadiet.com/files/icon/logo.png',
      faviconUrl: 'https://matchadiet.com/files/icon/favicon.ico',
      colors: {
        primary: '#37CAA5',
        secondary: '#E76D85',
        text: '#214A40',
        muted: '#888888',
        box: '#FFFFFF',
        border: '#EFEFEF',
        background: '#F6F8FA',
      },
      input: {
        isShowFootUnit: false,
      },
      menuItems: [
        {
          title: 'صفحه اصلی',
          path: 'https://matchadiet.com/',
        },
        {
          title: 'حساب کاربری',
          path: 'https://telegram.me/matchasupport',
        },
        {
          title: 'پشتیبانی',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'کانال تلگرام',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خرید اشتراک',
          path: 'https://about.matchadiet.com/',
        },
        {
          title: 'خروج از حساب',
          path: 'https://about.matchadiet.com/',
        },
      ],
      messages: {
        errors: {
          general: "Sembra che ci sia un problema. Si prega di riprovare o contattare l'amministratore del sito.",
          connection: 'Si prega di assicurarsi di essere connessi a Internet.',
          authorization: 'Si prega di accedere prima di continuare.',
          input: {
            default: 'Si prega di fare attenzione.',
            empty: 'Questo campo non può essere vuoto.',
            email: 'Si prega di inserire un indirizzo email valido.',
          },
          notFound: {
            title: 'Pagina Non Trovata',
            description:
              'La pagina richiesta non è stata trovata. Puoi tornare alla home page cliccando il pulsante qui sotto.',
            button: 'Ritorna alla Home Page',
          },
          success: {
            enter: 'Accesso effettuato con successo.',
            out: 'Disconnessione effettuata con successo.',
            submit: 'Operazione registrata con successo.',
          },
        },
      },
      googleAnalyticsID: '',
    },
  },
}

global.config = { ...VARIABLES[PROJECT][LOCALE] }
