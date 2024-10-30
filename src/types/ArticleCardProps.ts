import { ArticleProps } from "./ArticleProps";

export interface ArticleCardProps {
    vehicle: ArticleProps;
    onBookNow: (id: number) => void;
    onViewDetails: (id: number) => void;
  }