export interface CheckoutBanner {
  title: string;
  image: string;
  description: string;
  bgColor: string;
}

export interface CheckoutButton {
  text: string;
  link: string;
  bgColor: string;
  color: string;
}

export interface CheckoutDiscountBar {
  title: string;
  time: string;
  bgColor: string;
  titleColor: string;
  timerColor: string;
}

export interface WygItem {
  icon: string;
  title: string;
  description: string;
}

export interface PaymentModalItem {
  availableOnDiscount: 'true' | 'false';
  color: string;
  title: string;
  value: string;
}

export interface PaymentModal {
  [key: string]: PaymentModalItem[];
}

export interface PlanItem {
  featured: string;
  featuredTitle: string;
  planId: string;
  title: string;
  description: string;
  length: string;
  timeUnit: string;

  price: {
    regular: number;
    discounted: number;
    preUnit: string;
    unit: string;
  };
}

export interface Plans {
  sectionTitle: string;

  target: {
    title: string;
    description: string;
    icon: string;
  };

  regime: {
    title: string;
    description: string;
    icon: string;
  };

  items: PlanItem[];
  paymentModal: any;
}

export interface CommentsItem {
  profileName: string;
  profileImage: string;
  date: string;
  title: string;
  text: string;
  image: string;
  rate: string;
  voice?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type sliderItem = {
  comment: string;
  date: string;
  mainImage: string;
  name: string;
  profileImage: string;
  socialLogo: string;
};

export type horizontalComments = {
  items: sliderItem[];
  sectionTitle: string;
};

export interface CheckoutResult {
  token: string | undefined;
  code: string | undefined;
  banner: CheckoutBanner;
  button: CheckoutButton;
  discountBar: CheckoutDiscountBar;
  horizontalComments: horizontalComments;
  wyg: {
    sectionTitle: string;
    items: WygItem[];
    video?: {
      link: string;
      text: string;
    };
  };
  plans: Plans;
  comments: {
    sectionTitle: string;
    items: CommentsItem[];
  };
  faq: {
    sectionTitle: string;
    backgroundImage?: {
      left?: string;
      right?: string;
    };
    items: FaqItem[];
  };
  nextPage: string;
  type: string;
  guarantee: {
    guaranteeTitle: string;
    guaranteeDescription: string;
  };
  footer: {
    title: string;
    description: string;
  };
  clientToken?: string;
  currency?: string;
}

export interface CheckoutBannerProps {
  title: string;
  description: string;
  image: string;
  discountBar: CheckoutDiscountBar;
  button: CheckoutButton;
}

export interface PlansContainerProps {
  plans: PlanItem[];
  target: {
    title: string;
    description: string;
    icon: string;
  };
  regime: {
    title: string;
    description: string;
    icon: string;
  };
  handlePlanClick: (index: number) => void;
  onButtonClick: () => Promise<any>;
  discount: boolean;
  sectionTitle: string;
  button: CheckoutButton;
  resultCode: null | string;
  isLoading?: boolean;
  clientToken: string;
  paymentModalItems: undefined | PaymentModal;
  currency: string;
}

export interface WygProps {
  wyg: WygItem[];
  sectionTitle: string;
  video?: {
    link: string;
    text: string;
  };
}

export interface CommentsItem {
  profileName: string;
  profileImage: string;
  date: string;
  title: string;
  text: string;
  image: string;
  rate: string;
  voice?: string;
}

export interface CheckoutButton {
  text: string;
  link: string;
  bgColor: string;
  color: string;
}
