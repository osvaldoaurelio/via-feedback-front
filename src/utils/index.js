const randomColor = () => {
  const value = ["9", "a", "b", "c", "d", "e", "f"];
  const r = value[Math.floor(Math.random() * 7)];
  const g = value[Math.floor(Math.random() * 7)];
  const b = value[Math.floor(Math.random() * 7)];

  return `#${r}${g}${b}`;
};

export { randomColor };
