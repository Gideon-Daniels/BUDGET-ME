export interface Report {
  title: string;
  id: number;
  amount: string;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO format (e.g., "2025-08-30")
  description?: string;
  // created_at: Date;
}
export interface ReportEntry {
  balance: string;
  income: string;
  expense: string;
}

export interface SummaryReport {
  [period: string]: {
    [type in keyof ReportEntry as string]: string;
  };
}
