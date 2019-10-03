export default (({
  pathname,
  search
}) => {
  if (search) {
    if (search.indexOf('?') !== 0) {
      search = `?${search}`;
    }

    return `${pathname}${search}`;
  }

  return pathname;
});