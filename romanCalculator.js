const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Арифметическое выражение: ", function (string) {

  const romanToArabic = {  //объект хранящий соответствия между римскими и арабскими числами
    "I": 1,
    "II": 2,
    "III": 3,
    "IV": 4,
    "V": 5,
    "VI": 6,
    "VII": 7,
    "VIII": 8,
    "IX": 9,
    "X": 10
  };

  const parts = string.split(" "); // делаем из строки массив, разделяя пробелами
  if (parts.length !== 3) // должно быть 3 элемента в массиве, иначе ошибка 
  {
    throw new Error("Некорректный формат ввода");
  }

  const operator = parts[1];
  let num1, num2, output;
  let useRoman = false; //По умолчанию не используем римские числа

  if (isNaN(parts[0]) && isNaN(parts[2])) // Проверим, используются ли римские числа
  {
    if (romanToArabic[parts[0]] === undefined || romanToArabic[parts[2]] === undefined) { // Сверяемся, есть ли в объекте romanToarabic значения для римских чисел
      throw new Error("Не корректные римские числа");
    }
    useRoman = true;
    num1 = romanToArabic[parts[0]];
    num2 = romanToArabic[parts[2]];

  }
  else if (parseInt(parts[0]) > 0 &&
    parseInt(parts[0]) <= 10 &&
    parseInt(parts[2]) > 0 &&
    parseInt(parts[2]) <= 10) {
    num1 = parseInt(parts[0]);
    num2 = parseInt(parts[2]);
  }
  else {
    throw new Error("Ввод не соответствует условиям (числа должны быть в диапазоне от 1 до 10)");
  }

  switch (operator) // Сверяем оператор и выполняем действия
  {
    case "+":
      output = num1 + num2;
      break;
    case "-":
      output = num1 - num2;
      break;
    case "*":
      output = num1 * num2;
      break;
    case "/":
      output = Math.floor(num1 / num2);
      break;
    default:
      console.log("Оператор не верный");
  }


  if (useRoman) { //если использовались римские числа, то воспользуемся функцией для перевода арабского числа в римское
    function arabicToRoman(output) {

      let roman = "";
      let romanNumerals = ["C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      let arabicNumerals = [100, 90, 50, 40, 10, 9, 5, 4, 1];

      for (let i = 0; i < arabicNumerals.length; i++) // Долго писать что это, но работает не плохо
      {
        while (output >= arabicNumerals[i]) {
          roman += romanNumerals[i];
          output -= arabicNumerals[i];
        }
      }
      return roman; // Возвращаем римское число
    }

    const romanResult = arabicToRoman(output); // Вызываем функцию и сохраняем результат в переменной romanResult
    console.log(romanResult); // Выводим результат римских чисел в консоль

  } else {
    console.log(output); // Выводим арабское число в консоль
  }

  rl.close(); // Завершаем работу с консолью
});
