const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({ message: 'TODO API Server' });
});

app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 1, name: '仕事', color: '#3B82F6' },
    { id: 2, name: '個人', color: '#10B981' },
    { id: 3, name: '買い物', color: '#F59E0B' },
    { id: 4, name: 'その他', color: '#6B7280' }
  ];
  res.json({ success: true, data: categories });
});

app.get('/api/todos', (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = app;
