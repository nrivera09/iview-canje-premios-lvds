export const calcProgressbar = (puntos: number, puntosMin: number): number => {
  if (puntosMin === 0) return 0;
  return Math.min((puntos / puntosMin) * 100, 100);
};

export const generateUniqueNumber = (length: number): number => {
  if (length > 10 || length < 1) {
    throw new Error("La longitud debe estar entre 1 y 10 (números únicos)");
  }

  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  const shuffled = digits.sort(() => 0.5 - Math.random());
  const result = shuffled.slice(0, length).join("");

  return parseInt(result, 10);
};

export const insertZeroAfterTwoDigits = (input: number | string): string => {
  const str = input.toString();
  if (str.length < 2) return str; // Si tiene menos de 2 dígitos, no hace nada
  return str.slice(0, 2) + "0" + str.slice(2);
};

export const formatPercentage = (
  valor: number,
  maxDigits: number = 2,
  locale: string = "es-PE"
): string => {
  return valor.toLocaleString(locale, {
    maximumFractionDigits: maxDigits,
  });
};
