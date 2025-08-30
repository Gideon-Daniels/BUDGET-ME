export interface Report {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO format (e.g., "2025-08-30")
  description?: string;
  created_at: Date;
}
