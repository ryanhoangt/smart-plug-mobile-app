function getFormatedDate() {
  const date = new Date();
  const formatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString('en-US', formatOptions);
}

export { getFormatedDate };
