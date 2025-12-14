import { format, parseISO, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy年MM月dd日', { locale: ja });
  } catch (error) {
    return dateString;
  }
};

export const formatDateShort = (dateString) => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'MM/dd', { locale: ja });
  } catch (error) {
    return dateString;
  }
};

export const formatDateInput = (dateString) => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    return isPast(date) && !isToday(date);
  } catch (error) {
    return false;
  }
};

export const isDueSoon = (dateString) => {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    return isToday(date) || isTomorrow(date);
  } catch (error) {
    return false;
  }
};

export const getDaysUntilDue = (dateString) => {
  if (!dateString) return null;
  try {
    const date = parseISO(dateString);
    return differenceInDays(date, new Date());
  } catch (error) {
    return null;
  }
};

export const getDueDateStatus = (dateString) => {
  if (!dateString) return null;

  const daysUntil = getDaysUntilDue(dateString);

  if (daysUntil === null) return null;

  if (daysUntil < 0) {
    return {
      status: 'overdue',
      message: `${Math.abs(daysUntil)}日遅れ`,
      color: '#EF4444'
    };
  } else if (daysUntil === 0) {
    return {
      status: 'today',
      message: '今日まで',
      color: '#F59E0B'
    };
  } else if (daysUntil === 1) {
    return {
      status: 'tomorrow',
      message: '明日まで',
      color: '#F59E0B'
    };
  } else if (daysUntil <= 7) {
    return {
      status: 'soon',
      message: `${daysUntil}日後`,
      color: '#6B7280'
    };
  } else {
    return {
      status: 'future',
      message: formatDateShort(dateString),
      color: '#6B7280'
    };
  }
};
