export const getGenderByPesel = (pesel: string): "M" | "K" => {
  if (parseInt(pesel.substring(9, 10), 10) % 2 === 1) {
    return "M";
  }

  return "K";
};
