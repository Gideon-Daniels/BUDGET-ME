CREATE TABLE IF NOT EXISTS transaction_statements
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  income      DECIMAL(10, 2) NOT NULL,
  expense     DECIMAL(10, 2) NOT NULL,
  balance     DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  date        DATE           NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
