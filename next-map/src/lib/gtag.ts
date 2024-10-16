export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/tag-platform/gtagjs/reference?hl=ko
export const pageview = (url: URL | string) => {
  window.gtag("config", GA_TRACKING_ID as string, {
    page_path: url,
  });
};

type gtagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: gtagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
