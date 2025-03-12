export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const pascalCaseToReadable = (str: string) => {
  return str
    .split('_')
    .map((s) => capitalizeFirstLetter(s))
    .join(' ');
};
