const dataImc = [
	{
		min: 0,
		max: 18.5,
		classificacao: "Menor que 18,5",
		info: "Magreza",
		obsesidade: "0",
	},
	{
		min: 18.5,
		max: 24.9,
		classificacao: "Entre 18,5 e 24,9",
		info: "Normal",
		obsesidade: "",
	},
	{
		min: 25,
		max: 29.9,
		classificacao: "Entre 25 e 29,9",
		info: "Sobrepezo",
		obsesidade: "I",
	},
	{
		min: 30,
		max: 39.9,
		classificacao: "Entre 30 e 39,9",
		info: "Obesidade",
		obsesidade: "II",
	},
	{
		min: 40,
		max: 9999,
		classificacao: "Maior que 40",
		info: "Obesidade Grave",
		obsesidade: "III",
	},
];

document.querySelector("#btn-calcular").addEventListener("click", generateDivResult);
document.querySelector("#btn-Limpar").addEventListener("click", clearInputs);
document.querySelector("#btn-return").addEventListener("click", toggleHtml);

function calculateIMC() {
	const altura = +document.querySelector("#input-altura").value.replace(",", ".");
	const peso = +document.querySelector("#input-peso").value.replace(",", ".");
	// console.log(peso, altura);
	if (!altura || !peso) {
		return;
	}
	return (peso / Math.pow(altura, 2)).toFixed(1);
}
function clearInputs() {
	let inputs = document.querySelectorAll(".input-default");
	for (let input of inputs) {
		input.value = "";
	}
}

function verifyImc(imc) {
	console.log(imc);
	for (const e of dataImc) {
		if (imc >= e.min && imc <= e.max) {
			return e;
		}
	}
	return null;
}

function populateDivImcResult(imcVerified, resultimc) {
	clearTableImc();
	document.querySelector(".imc-result").textContent = resultimc;
	document.querySelector(".imc-info").textContent = imcVerified.info;

	for (const e of dataImc) {
		// resultRowTable.appendChild(document.createElement("tr"));
		populateTable(e.classificacao, e.info, e.obsesidade);
	}
}

function populateTable(classificacao, info, obesidade) {
	const resultRowTable = document.querySelector(".result-table");
	const tr = document.createElement("tr");
	tr.classList.add("xx");
	const tdClassificacao = document.createElement("td");
	const tdInfo = document.createElement("td");
	const tdObesidade = document.createElement("td");

	tdClassificacao.textContent = classificacao;
	tdInfo.textContent = info;
	tdObesidade.textContent = obesidade;

	resultRowTable.appendChild(tr);
	tr.appendChild(tdClassificacao);
	tr.appendChild(tdInfo);
	tr.appendChild(tdObesidade);
}

function toggleHtml() {
	document.querySelector("#container-calc").classList.toggle("hide");
	document.querySelector("#container-result").classList.toggle("hide");
	document.querySelector(".container-buttons").classList.toggle("hide");
	document.querySelector(".container-buttons-return").classList.toggle("hide");
	clearInputs();
}

function generateDivResult() {
	const spanError = document.querySelector(".error-information");
	let resultimc = calculateIMC();
	if (isNaN(resultimc)) {
		spanError.classList.remove("hide");
		return;
	}
	spanError.classList.add("hide");
	const imcVerified = verifyImc(resultimc);
	if (!imcVerified) {
		spanError.classList.remove("hide");
		return;
	}
	populateDivImcResult(imcVerified, resultimc);
	toggleHtml();
}

function clearTableImc() {
	let tr = document.querySelectorAll(".xx");
	if (tr.length > 0) {
		tr.forEach((row) => row.remove());
	}
}
