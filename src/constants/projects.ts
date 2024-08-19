export const thisLocale: 'fa_IR' | 'en_US' = 'fa_IR';
export const thisProject = 'matcha';

export const configcontrol = {
  
  mint: {
    fa_IR: {
      menuItems: [
        {
          name: 'خانه',
          path: 'https://www.mintapp.ir/',
        },
        {
          name: 'پشتیبانی',
          path: 'https://telegram.me/Mintsupport',
        },
      ],
      types: ['eghdam', 'eghdam_ge', 'eghdam_ad', 'ovary'],
    },
    en_US: {
      menuItems: [
        {
          name: 'Home',
          path: 'https://www.mintapp.ir/',
        },
        {
          name: 'Support',
          path: 'https://telegram.me/Mintsupport',
        },
      ],
      types: ['eghdam', 'eghdam_ge', 'eghdam_ad', 'ovary'],
    },
  },
  matcha: {
    fa_IR: {
      menuItems: [
        {
          name: 'خانه',
          path: 'https://matchadiet.com/',
        },
        {
          name: 'پشتیبانی',
          path: 'https://ai.matchadiet.com/fa/?type=chatsup',
        },
        {
          name: 'درباره ما',
          path: 'https://matchadiet.com/about-us',
        },
        {
          name: 'قوانین و مقررات',
          path: 'https://matchadiet.com/terms.html',
        },
        {
          name: 'حریم خصوصی',
          path: 'https://matchadiet.com/privacy.html',
        },
      ],
      types: ['fit', 'gym', 'inc'],
    },
    en_US: {
      menuItems: [
        {
          name: 'Home',
          path: 'https://matchadiet.com/',
        },
        {
          name: 'Support',
          path: 'https://telegram.me/matchasupport',
        },
        {
          name: 'About Us',
          path: 'https://about.matchadiet.com/',
        },
      ],
      types: ['fit', 'gym', 'inc'],
    },
  },
  yogini: {
    fa_IR: {
      menuItems: [
        {
          name: 'پشتیبانی',
          path: 'https://telegram.me/yoginisupp',
        },
      ],
      types: ['yoga'],
    },
    en_US: {
      menuItems: [
        {
          name: 'پشتیبانی',
          path: 'https://telegram.me/yoginisupp',
        },
      ],
      types: ['asana'],
    },
  },
  cocoyoga: {
    fa_IR: {
      menuItems: [
        {
          name: 'خانه',
          path: 'https://cocofit.yoga/',
        },
        {
          name: 'پشتیبانی',
          path: 'https://wa.me/447423268315',
        },
      ],
      types: ['yoga'],
    },
    en_US: {
      menuItems: [
        {
          name: 'Home',
          path: 'https://cocofit.yoga/',
        },
        {
          name: 'Support',
          path: 'https://wa.me/447423268315',
        },
      ],
      types: ['asana'],
    },
  },
};
export const menuItems = configcontrol[thisProject][thisLocale]['menuItems'];
export const types = configcontrol[thisProject][thisLocale]['types'];
export const defaultType = configcontrol[thisProject][thisLocale]['types'][0];

export const projects = {
  matcha: {
    fa_IR: {
      SERVER: 'https://matchadiet.com/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://matchadiet.com',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'ماچا',
      META_DESCRIPTION: 'کاهش وزن پایدار و اصلاح سبک زندگی',
      LOGO_URL: 'https://matchadiet.com/files/icon/logo.png',
      FAVICON_URL: 'https://matchadiet.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: 'AW-958897314',
      PAYPAL_CLIENT_ID: 'AffC5rYyOSiH3QnfYZ8WrpRWN5qSRn2lV_I8bAvz-WZxsTrR2iIc-RzED35I8dKRNrLaENb-qUVKSbYZ',
      PAYPAL_BASE_URL: 'https://cocofit.yoga/gateway/paypal',
      PAYPAL_MERCHENT_ID: '6565XYEQSSK9W',
      ENAMAD:
        '<a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=330046&amp;Code=ksy6HJkjtqimw7smqJ9r"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=330046&amp;Code=ksy6HJkjtqimw7smqJ9r" alt="" style="cursor:pointer" id="ksy6HJkjtqimw7smqJ9r"></a>',
      HATJAR_SCRIPT_FUNCTION: '',
    },
  },
  mint: {
    fa_IR: {
      SERVER: 'https://mintdoctor.ir/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://mintdoctor.ir',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'مینت',
      META_DESCRIPTION:
        'اگه دنبال این هستین که در کمترین زمان ممکن باردار بشید یا خودتون جنسیت فرزندتون رو تعیین کنین، مینت کمکتون میکنه',
      LOGO_URL: 'https://mintdoctor.ir/files/icon/logo.png',
      FAVICON_URL: 'https://mintdoctor.ir/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: '',
      HATJAR_SCRIPT_FUNCTION: '',
    },
  },
  lavender: {
    fa_IR: {
      SERVER: 'https://lavenderdiet.com/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://lavenderdiet.com',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'لاوندر',
      META_DESCRIPTION: 'به کمک رژیم های غذایی و متد S&M پوستی شاداب، درخشان و بدون جوشی رو خواهید داشت',
      LOGO_URL: 'https://lavenderdiet.com/files/icon/logo.png',
      FAVICON_URL: 'https://lavenderdiet.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: '',
      HATJAR_SCRIPT_FUNCTION: '',
    },
  },
  ugo: {
    fa_IR: {
      SERVER: 'https://ugo-global-immigration-center.com/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://ugo-global-immigration-center.com',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'یوگو',
      META_DESCRIPTION: 'به کمک یوگو هوشمند مهاجرت کنید و بهترین مقصد و روش مهاجرتیتون رو انتخاب کنید.',
      LOGO_URL: 'https://ugo-global-immigration-center.com/files/icon/logo.png',
      FAVICON_URL: 'https://ugo-global-immigration-center.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: '',
      HATJAR_SCRIPT_FUNCTION: '',
    },
  },
  yogini: {
    fa_IR: {
      SERVER: 'https://online-yogini.com/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://online-yogini.com',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'یوگینی | یادگیری یوگا و تقویت جسم و روح در کمترین زمان ممکن',
      META_DESCRIPTION:
        'در یوگینی قدرت و انعطاف بدنیت رو تقویت میکنی، به وزن دلخواهت میرسی و همزمان روحت رو آرامش میدی.',
      LOGO_URL: 'https://online-yogini.com/files/icon/logo.png',
      FAVICON_URL: 'https://online-yogini.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: 'AW-11301719837',
      HATJAR_SCRIPT_FUNCTION: '',
    },
    en_US: {
      SERVER: 'https://yogini-class.com/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://yogini-class.com',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'en_US',
      SITE_TITLE: 'Yogini: Learn Yoga Professionally',
      META_DESCRIPTION:
        "In yogini, you strengthen your body's strength and flexibility, get fit, and relax your soul simultaneously.",
      LOGO_URL: 'https://online-yogini.com/files/icon/logo.png',
      FAVICON_URL: 'https://online-yogini.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'Seems we have a problem here. Please try again or contact adminstrator',
      CONNECTION_ERROR: 'Please make sure you have a internet connection',
      AUTHORIZATION_ERROR: "You don't have the permission to access this page",
      DEFAULT_INPUT_ERROR: 'Attention please!',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: '404 | Not Found',
      NOT_FOUND_DESCRIPTION: 'The page you are looking for is not here',
      NOT_FOUND_BUTTON_TEXT: 'Return to Home',
      GOOGLE_ANALYTICS_ID: '',
      HATJAR_SCRIPT_FUNCTION: '',
    },
  },
  cocoyoga: {
    fa_IR: {
      SERVER: 'https://cocofit.yoga/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://cocofit.yoga',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'fa_IR',
      SITE_TITLE: 'یوگینی | یادگیری یوگا و تقویت جسم و روح در کمترین زمان ممکن',
      META_DESCRIPTION:
        'در یوگینی قدرت و انعطاف بدنیت رو تقویت میکنی، به وزن دلخواهت میرسی و همزمان روحت رو آرامش میدی.',
      LOGO_URL: 'https://online-yogini.com/files/icon/logo.png',
      FAVICON_URL: 'https://online-yogini.com/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'بنظر می رسد مشکلی وجود دارد. لطفا مجددا تلاش کرده یا با مدیر سایت تماس بگیرید',
      CONNECTION_ERROR: 'لطفا از اتصال به اینترنت مطمئن شوید',
      AUTHORIZATION_ERROR: 'شما اجازه دسترسی به این بخش را ندارید',
      DEFAULT_INPUT_ERROR: 'لطفا دقت کنید',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: 'صفحه مورد نظر یافت نشد',
      NOT_FOUND_DESCRIPTION: 'صفحه مورد نظر یافت نشد. شما می توانید با فشردن دکمه زیر به صفحه اصلی بازگردید.',
      NOT_FOUND_BUTTON_TEXT: 'بازگشت به صفحه اصلی',
      GOOGLE_ANALYTICS_ID: '',
      HATJAR_SCRIPT_FUNCTION: '',
    },
    en_US: {
      SERVER: 'https://cocofit.yoga/process/v2',
      PRE_CONNECT_SERVER_URL: 'https://cocofit.yoga',
      PROJECT: thisProject.toUpperCase(),
      DEFAULT_TYPE: defaultType,
      TYPES: JSON.stringify(types),
      FIRST_AID: 'start',
      DEFAULT_LOCALE: 'en_US',
      SITE_TITLE: 'CocoFit: Learn Yoga Professionally',
      META_DESCRIPTION:
        "In cocofit, you strengthen your body's strength and flexibility, get fit, and relax your soul simultaneously.",
      LOGO_URL: 'https://cocofit.yoga/files/icon/logo.png',
      FAVICON_URL: 'https://cocofit.yoga/files/icon/favicon.ico',
      PRIMARY_COLOR: '#e76d85',
      HOVER_COLOR: '#e54c6a',
      BUTTON_TEXT_COLOR: 'white',
      PRIMARY_TEXT_COLOR: '#090a0a',
      SECONDARY_TEXT_COLOR: '#FFFFFF',
      GLOBAL_ERROR: 'Seems we have a problem here. Please try again or contact adminstrator',
      CONNECTION_ERROR: 'Please make sure you have a internet connection',
      AUTHORIZATION_ERROR: "You don't have the permission to access this page",
      DEFAULT_INPUT_ERROR: 'Attention please!',
      MENU_ITEMS: JSON.stringify(menuItems),
      NOT_FOUND_TITLE: '404 | Not Found',
      NOT_FOUND_DESCRIPTION: 'The page you are looking for is not here',
      NOT_FOUND_BUTTON_TEXT: 'Return to Home',
      GOOGLE_ANALYTICS_ID: 'AW-11323479475',
      PAYPAL_CLIENT_ID: 'AffC5rYyOSiH3QnfYZ8WrpRWN5qSRn2lV_I8bAvz-WZxsTrR2iIc-RzED35I8dKRNrLaENb-qUVKSbYZ',
      PAYPAL_BASE_URL: 'https://cocofit.yoga/gateway/paypal',
      PAYPAL_MERCHENT_ID: '6565XYEQSSK9W',
      ENAMAD: '',
      HATJAR_SCRIPT_FUNCTION: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3662280,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
    },
  },
};

export const THISPROJECT = { ...projects[thisProject][thisLocale] };
