export function getObjectsByCategory(array, chosenCategory) {
  return array.filter(item => item.category === chosenCategory);
};

export function formatCategoryTitle(string) {
  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};