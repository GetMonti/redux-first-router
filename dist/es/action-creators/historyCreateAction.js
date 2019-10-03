import pathToAction from '../pure-utils/pathToAction';
import nestAction from '../pure-utils/nestAction';
export default ((pathname, routesMap, prevLocation, history, kind, serializer, prevPath, prevLength) => {
  const action = pathToAction(pathname, routesMap, serializer);
  kind = getKind(!!history.entries, history, kind, prevPath, prevLength);
  return nestAction(pathname, action, prevLocation, history, kind);
});

const getKind = (isMemoryHistory, history, kind, prevPath, prevLength) => {
  if (!isMemoryHistory || !prevPath || kind !== 'pop') {
    return kind;
  }

  if (isBack(history, prevPath)) {
    return 'back';
  } else if (isNext(history, prevPath, prevLength)) {
    return 'next';
  }

  return kind;
};

const isBack = (hist, path) => {
  const next = hist.entries[hist.index + 1];
  return next && next.pathname === path;
};

const isNext = (hist, path, length) => {
  const prev = hist.entries[hist.index - 1];
  const notPushed = length === hist.length;
  return prev && prev.pathname === path && notPushed;
};