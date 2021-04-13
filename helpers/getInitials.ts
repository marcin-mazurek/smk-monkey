export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((namePart) => namePart[0])
    .map((letter) => letter.toUpperCase())
    .join("");
