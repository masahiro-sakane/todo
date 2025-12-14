export const validateTodoTitle = (title) => {
  if (!title || !title.trim()) {
    return 'タイトルは必須です';
  }
  if (title.length > 200) {
    return 'タイトルは200文字以内にしてください';
  }
  return null;
};

export const validateTodoDescription = (description) => {
  if (description && description.length > 1000) {
    return '説明は1000文字以内にしてください';
  }
  return null;
};

export const validatePriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return '優先度は low, medium, high のいずれかを指定してください';
  }
  return null;
};

export const validateDueDate = (dueDate) => {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    return '有効な日付を入力してください';
  }
  return null;
};

export const validateCategoryName = (name) => {
  if (!name || !name.trim()) {
    return 'カテゴリ名は必須です';
  }
  if (name.length > 50) {
    return 'カテゴリ名は50文字以内にしてください';
  }
  return null;
};

export const validateCategoryColor = (color) => {
  if (!color) return null;

  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexColorRegex.test(color)) {
    return '色は16進数カラーコード形式（#RRGGBB）で指定してください';
  }
  return null;
};

export const validateTodo = (todoData) => {
  const errors = {};

  const titleError = validateTodoTitle(todoData.title);
  if (titleError) errors.title = titleError;

  const descriptionError = validateTodoDescription(todoData.description);
  if (descriptionError) errors.description = descriptionError;

  const priorityError = validatePriority(todoData.priority);
  if (priorityError) errors.priority = priorityError;

  const dueDateError = validateDueDate(todoData.due_date);
  if (dueDateError) errors.due_date = dueDateError;

  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateCategory = (categoryData) => {
  const errors = {};

  const nameError = validateCategoryName(categoryData.name);
  if (nameError) errors.name = nameError;

  const colorError = validateCategoryColor(categoryData.color);
  if (colorError) errors.color = colorError;

  return Object.keys(errors).length > 0 ? errors : null;
};
