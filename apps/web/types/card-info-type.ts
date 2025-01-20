export type TCardInfo = {
  value: string | number;
  showChange?: boolean;
  description?: string;
  affect?: 'positive' | 'negative' | 'neutral';
  change?: 'increase' | 'decrease' | 'neutral';
  changeRate?: number;
}