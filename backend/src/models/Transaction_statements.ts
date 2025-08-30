export interface Transaction_statements {
  id: number;
  income: number;
  expense: number;
  balance: number;
  date: string; // ISO format (e.g., "2025-08-30")
  description?: string;
  created_at: Date;
}
