CREATE TABLE IF NOT EXISTS reports
(
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(50)                NOT NULL,
  amount      DECIMAL(10, 2)             NOT NULL,
  type        ENUM ('income', 'expense') NOT NULL,
  category    VARCHAR(100)               NOT NULL,
  date        DATE                       NOT NULL,
  description VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
