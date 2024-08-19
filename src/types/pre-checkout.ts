export interface PreCheckoutHeader {
  color: string;
  bgColor: string;
  image: string;
  text: string;
}

export interface PreCheckoutButton {
  text: string;
  link: string;
  bgColor: string;
  color: string;
}

export interface SummeryVideo {
  link: string;
  text: string;
}

export interface HighlightLineBar {
  title: string;
  value: string;
  label: string;
  scaleList: string[];
}

export interface SummeryLineBar extends HighlightLineBar {
  warningTitle: string;
  warningDescription: string;
}

export interface SummeryItem {
  icon: string;
  title: string;
  description: string;
  descriptionColor: string;
}

export interface PreCheckoutSummery {
  title: string;
  video: SummeryVideo;
  lineBar: SummeryLineBar;
  borderImage: string;
  items: SummeryItem[];
}

export interface HighlightItem {
  icon: string;
  title: string;
  description: string;
  descriptionColor: string;
}

export interface HighlightPercentage {
  value: string;
  description: string;
  afterText: string | null | undefined;
}

export interface PreCheckoutHighlight {
  title: string;
  lineBar: HighlightLineBar;
  borderImage: string;
  items: HighlightItem[];
  percentage: HighlightPercentage;
}

export interface PreCheckoutResult {
  token?: string | undefined;
  code?: string | undefined;
  header: PreCheckoutHeader;
  button: PreCheckoutButton;
  summery: PreCheckoutSummery;
  highlight: PreCheckoutHighlight;
}

export interface ResultBoxListItem {
  icon: string;
  title: string;
  description: string;
  descriptionColor: string;
}
