(function () {
	const quantidade = document.querySelector("#quantidade");
	const de = document.querySelector("#de");
	const ate = document.querySelector("#ate");
	const btnSortear = document.querySelector("#btn-sortear");
	const btnReiniciar = document.querySelector("#btn-reiniciar");
	const paragrafos = document.getElementsByClassName("texto__paragrafo");
	const arrayParagrafos = Array.from(paragrafos);
	const msgResultado = arrayParagrafos[3];

	function sortearNumero(de, ate) {
		let numeroSorteado = parseInt(Math.random() * ate + 1);
		if (numeroSorteado < de) {
			numeroSorteado = sortearNumero(de, ate);
		}
		return numeroSorteado;
	}

	function validarNumero(arraySorteados, numeroAtual) {
		let repetido = false;
		if (arraySorteados.length > 1) {
			for (let i = 0; i < arraySorteados.length - 1; i++) {
				if (numeroAtual == arraySorteados[i]) {
					return (repetido = true);
				}
			}
		}
		return repetido;
	}

	btnSortear.addEventListener("click", () => {
		if ((quantidade.value != "") & (ate.value != "") & (de.value != "")) {
			const vQuantidade = parseInt(quantidade.value);
			const vAte = parseInt(ate.value);
			const vDe = parseInt(de.value);

			if ((vQuantidade >= 1) & (vAte > vDe) & (vQuantidade <= vAte - vDe)) {
				let novaMsg = "Números sorteados: ";
	
				let nSorteado = [];
				let contador = 0;
	
				do {
					let repetido = false;
	
					nSorteado[contador] = sortearNumero(vDe, vAte);
	
					repetido = validarNumero(nSorteado, nSorteado[contador]);
	
					if (repetido == false) {
						if (contador == vQuantidade - 1) {
							novaMsg += nSorteado[contador].toString();
						} else {
							novaMsg += nSorteado[contador].toString() + " - ";
						}
						contador++;
					}
				} while (contador < vQuantidade);
	
				msgResultado.textContent = novaMsg;
	
				btnReiniciar.classList.remove("container__botao-desabilitado");
				btnReiniciar.classList.add("container__botao");
			}
		}
	});

	btnReiniciar.addEventListener("click", () => {
		if (btnReiniciar.classList.contains("container__botao")) {
			de.value = "";
			ate.value = "";
			quantidade.value = "";

			btnReiniciar.classList.add("container__botao-desabilitado");
			btnReiniciar.classList.remove("container__botao");
		}
	});
})();