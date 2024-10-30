import { ArticleProps } from "./ArticleProps";

export interface FeaturedAticlesSectionProps {
    vehicles: ArticleProps[];
    onBookNow: (id: number) => void;
    onViewDetails: (id: number) => void;
  }