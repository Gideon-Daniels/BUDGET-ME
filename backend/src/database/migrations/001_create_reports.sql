CREATE TABLE IF NOT EXISTS reports
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  amount      DECIMAL(10, 2)             NOT NULL,
  type        ENUM ('income', 'expense') NOT NULL,
  category    VARCHAR(100)               NOT NULL,
  description VARCHAR(255),
  date        DATE                       NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
