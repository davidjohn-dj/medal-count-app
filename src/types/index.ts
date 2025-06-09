export interface MedalData {
  code: string;
  gold: number;
  silver: number;
  bronze: number;
}

export interface MedalDataWithTotal extends MedalData {
  total: number;
}

export type SortType = 'total' | 'gold' | 'silver' | 'bronze';

export interface MedalTableProps {
  medals: MedalDataWithTotal[];
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
}

export interface FlagProps {
  countryCode: string;
  countryName?: string;
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
} 