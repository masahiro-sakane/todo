module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const path = req.url;

  if (path === '/api' || path === '/api/') {
    res.status(200).json({ message: 'TODO API Server (Demo)' });
    return;
  }

  if (path === '/api/categories' || path.startsWith('/api/categories')) {
    const categories = [
      { id: 1, name: '仕事', color: '#3B82F6', created_at: new Date().toISOString() },
      { id: 2, name: '個人', color: '#10B981', created_at: new Date().toISOString() },
      { id: 3, name: '買い物', color: '#F59E0B', created_at: new Date().toISOString() },
      { id: 4, name: 'その他', color: '#6B7280', created_at: new Date().toISOString() }
    ];
    res.status(200).json({ success: true, data: categories });
    return;
  }

  if (path === '/api/todos' || path.startsWith('/api/todos')) {
    res.status(200).json({
      success: true,
      data: [],
      message: 'Demo version - data is not persisted'
    });
    return;
  }

  res.status(404).json({ success: false, error: 'Not found' });
};
