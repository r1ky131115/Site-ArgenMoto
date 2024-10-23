interface CounterItem {
  id: number;
  number: number;
  text: string;
  prefix?: string;
  suffix?: string;
}

export interface HeroSectionProps {
    backgroundImage: string;
    title: string;
    description: string;
    counters?: CounterItem[];
  }