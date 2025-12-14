-- categories テーブル
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#808080',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- todos テーブル
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT 0,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
  due_date DATE,
  category_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- デフォルトカテゴリの挿入
INSERT OR IGNORE INTO categories (id, name, color) VALUES
  (1, '仕事', '#3B82F6'),
  (2, '個人', '#10B981'),
  (3, '買い物', '#F59E0B'),
  (4, 'その他', '#6B7280');
