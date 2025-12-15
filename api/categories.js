module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const categories = [
    { id: 1, name: '仕事', color: '#3B82F6', created_at: new Date().toISOString() },
    { id: 2, name: '個人', color: '#10B981', created_at: new Date().toISOString() },
    { id: 3, name: '買い物', color: '#F59E0B', created_at: new Date().toISOString() },
    { id: 4, name: 'その他', color: '#6B7280', created_at: new Date().toISOString() }
  ];

  const method = req.method;
  const path = req.url || '';

  // Extract ID from path if present
  const idMatch = path.match(/\/(\d+)(?:\/|$)/);
  const id = idMatch ? parseInt(idMatch[1]) : null;

  // GET /api/categories - Get all categories
  if (method === 'GET' && !id) {
    res.status(200).json({ success: true, data: categories });
    return;
  }

  // GET /api/categories/:id - Get specific category
  if (method === 'GET' && id) {
    const category = categories.find(c => c.id === id);
    if (category) {
      res.status(200).json({ success: true, data: category });
    } else {
      res.status(404).json({ success: false, error: 'カテゴリが見つかりません' });
    }
    return;
  }

  res.status(404).json({ success: false, error: 'Not found' });
};
