export function formatPrice(
  number: string | number,
  separator: string = " "
): string {
  // Приводим входное значение к числу
  const parsedNumber = typeof number === "string" ? parseFloat(number) : number;

  // Проверяем, является ли значение валидным числом
  if (isNaN(parsedNumber)) {
    return String(number); // Возвращаем входное значение как строку, если оно невалидно
  }

  // Обрабатываем отрицательные числа
  const isNegative = parsedNumber < 0;
  const absNumber = Math.abs(parsedNumber);

  // Получаем целую и дробную части
  const [integerPart, decimalPart] = absNumber.toString().split(".");

  // Форматируем целую часть с разделителями
  const formattedInteger = integerPart
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      return digit + (index > 0 && index % 3 === 0 ? separator : "") + acc;
    }, "");

  // Собираем результат
  let result = (isNegative ? "-" : "") + formattedInteger;

  // Добавляем дробную часть, если она есть
  if (decimalPart !== undefined) {
    result += "." + decimalPart;
  }

  return result;
}
