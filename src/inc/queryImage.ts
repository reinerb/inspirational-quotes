export const queryImage = async () => {
  const res = await fetch("https://picsum.photos/700");

  return res.url;
};
