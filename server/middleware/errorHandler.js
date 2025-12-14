export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(400).json({
      success: false,
      error: 'データベース制約違反: ' + (err.message || '重複するデータがあります')
    });
  }

  if (err.type === 'validation') {
    return res.status(400).json({
      success: false,
      error: err.message,
      details: err.details
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'サーバーエラーが発生しました';

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'リソースが見つかりません'
  });
};
