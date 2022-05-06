const generate = document.querySelector('#generateBtn');
const result = document.querySelector("#passwordResult");
const button = document.querySelector("#clipboardBtn");

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

//======Функция для генерации случайного нижнего регистра===
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

//======Функция для генерации случайного верхнего регистра===
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

//======Функция для генерации случайного числа===
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

//======Функция для генерации случайного символа===
function getRandomSymbol() {
	const symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}
//======Функция для генерации пароля===

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		(item) => Object.values(item)[0]
	);
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach((type) => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	const finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}

//======Прослушиватель для генерации пароля===
generate.addEventListener("click", () => {
	const length = document.querySelector("#passwordLength").value;
	const hasUpper = document.querySelector("#uppercase").checked;
	const hasLower = document.querySelector("#lowercase").checked;
	const hasNumber = document.querySelector("#numbers").checked;
	const hasSymbol = document.querySelector("#symbols").checked;
	result.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//======Прослушиватель для копирования пароля===
button.addEventListener("click", (e) => {
	e.preventDefault();
	document.execCommand(
		"copy",
		false,
		result.select()
	);
});