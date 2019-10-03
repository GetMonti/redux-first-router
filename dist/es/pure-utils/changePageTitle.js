export default ((doc, title) => {
  if (typeof title === 'string' && doc.title !== title) {
    return doc.title = title;
  }

  return null;
});
export const getDocument = () => {
  const isSSRTest = process.env.NODE_ENV === 'test' && typeof window !== 'undefined' && window.isSSR;
  return typeof document !== 'undefined' && !isSSRTest ? document : {};
};