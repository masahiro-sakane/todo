const PriorityBadge = ({ priority }) => {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '中';
    }
  };

  const badgeClass = `badge badge-${priority || 'medium'}`;

  return (
    <span className={badgeClass}>
      {getPriorityLabel(priority)}
    </span>
  );
};

export default PriorityBadge;
