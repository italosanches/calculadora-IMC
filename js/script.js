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

document.querySelector("#btn-calcular").addEventListener("click", (e) => {
	const spanError = document.querySelector(".error-information");
	let resultimc = calculateIMC();
	if (isNaN(resultimc)) {
		spanError.classList.remove("hide");
		return;
	}
	spanError.classList.add("hide");

	const imcVerified = verifyImc(resultimc);
	console.log(imcVerified);
	populateDivImcResult(imcVerified);
});
document.querySelector("#btn-Limpar").addEventListener("click", (e) => {
	e.preventDefault();
	clearInputs();
});

function calculateIMC() {
	const altura = +document
		.querySelector("#input-altura")
		.value.replace(",", ".");
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
	for (const e of dataImc) {
		if (imc > e.min && imc < e.max) {
			return e.info;
		}
	}
	return null;
}

function populateDivImcResult(imcVerified) {
	document.querySelector(".imc-situation").textContent = imcVerified;

	for (const e of dataImc) {
		// resultRowTable.appendChild(document.createElement("tr"));
		populateTable(e.classificacao, e.info, e.obsesidade);
	}
}

function populateTable(classificacao, info, obesidade) {
	const resultRowTable = document.querySelector(".result-table");
	const tr = document.createElement("tr");
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
