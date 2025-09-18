document.addEventListener('DOMContentLoaded', () => {
    let salarioMensal = 0;
    let gastos = [];

    const salarioInput = document.getElementById('salarioInput');
    const salvarSalarioBtn = document.getElementById('salvarSalarioBtn');
    const gastoNomeInput = document.getElementById('gastoNomeInput');
    const gastoValorInput = document.getElementById('gastoValorInput');
    const adicionarGastoBtn = document.getElementById('adicionarGastoBtn');
    const listaDeGastos = document.getElementById('listaDeGastos');
    const calcularSaldoBtn = document.getElementById('calcularSaldoBtn');
    const saldoFinalDiv = document.getElementById('saldoFinal');
    const sugestaoInvestimentoDiv = document.getElementById('sugestaoInvestimento');
    const confettiContainer = document.getElementById('confetti-container'); // Referência ao contêiner de confetes

    salvarSalarioBtn.addEventListener('click', () => {
        salarioMensal = parseFloat(salarioInput.value) || 0;
        alert(`Salário mensal de R$ ${salarioMensal.toFixed(2)} salvo!`);
    });

    adicionarGastoBtn.addEventListener('click', () => {
        const nome = gastoNomeInput.value;
        const valor = parseFloat(gastoValorInput.value);

        if (nome && !isNaN(valor) && valor > 0) {
            const novoGasto = { 
                id: Date.now(), 
                nome, 
                valor 
            };
            gastos.push(novoGasto);

            const li = document.createElement('li');
            li.setAttribute('data-id', novoGasto.id);
            li.innerHTML = `
                <span>${nome}: R$ ${valor.toFixed(2)}</span>
                <button class="remover-gasto">Remover</button>
            `;
            listaDeGastos.appendChild(li);

            li.querySelector('.remover-gasto').addEventListener('click', (e) => {
                removerGasto(novoGasto.id);
            });

            gastoNomeInput.value = '';
            gastoValorInput.value = '';
        } else {
            alert('Por favor, preencha o nome e o valor do gasto.');
        }
    });

    calcularSaldoBtn.addEventListener('click', () => {
        let totalGastos = 0;
        gastos.forEach(gasto => {
            totalGastos += gasto.valor;
        });

        const saldo = salarioMensal - totalGastos;
        saldoFinalDiv.innerHTML = `<h3>Seu saldo é: R$ ${saldo.toFixed(2)}</h3>`;
        
        sugerirInvestimento(saldo);

        // Dispara a animação de confetes se o saldo for maior que R$ 500
        if (saldo > 500) {
            triggerConfetti();
        }
    });

    function removerGasto(id) {
        const index = gastos.findIndex(gasto => gasto.id === id);

        if (index > -1) {
            gastos.splice(index, 1);
            
            const liParaRemover = document.querySelector(`li[data-id="${id}"]`);
            if (liParaRemover) {
                liParaRemover.remove();
            }
        }
    }

    function sugerirInvestimento(saldo) {
        let sugestao = '';
        if (saldo <= 0) {
            sugestao = 'Seu orçamento está no limite. Considere revisar seus gastos ou buscar uma renda extra.';
        } else if (saldo > 0 && saldo <= 500) {
            sugestao = 'Com esse valor, o Tesouro Selic ou um CDB de liquidez diária são ótimas opções para começar a investir com segurança.';
        } else if (saldo > 500 && saldo <= 2000) {
            sugestao = 'Você pode diversificar! Considere investir em Fundos de Investimento ou explorar Fundos Imobiliários (FIIs).';
        } else {
            sugestao = 'Parabéns! Você tem um bom excedente. Estude sobre o mercado de ações e invista em um portfólio diversificado, incluindo FIIs e ações de empresas sólidas.';
        }
        sugestaoInvestimentoDiv.innerHTML = `<p>${sugestao}</p>`;
    }

    // --- Nova Função para Confetes ---
    const coresConfete = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff','#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff','#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff','#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    function triggerConfetti() {
        // Limpa confetes anteriores se houver
        confettiContainer.innerHTML = ''; 

        // Cria 100 confetes
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Define a cor aleatória
            const randomColor = coresConfete[Math.floor(Math.random() * coresConfete.length)];
            confetti.style.setProperty('--confetti-color', randomColor);

            // Posição inicial dos confetes (no centro da tela para simular explosão)
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;

            // Define as variáveis CSS para a animação de cada confete
            const xEnd = (Math.random() - 0.5) * window.innerWidth * 1.5; // Espalha horizontalmente
            const yEnd = (Math.random() - 0.5) * window.innerHeight * 1.5; // Espalha verticalmente
            const rotateEnd = Math.random() * 720; // Rotação aleatória

            confetti.style.setProperty('--x-start', '0px'); // Começa do centro
            confetti.style.setProperty('--y-start', '0px'); // Começa do centro
            confetti.style.setProperty('--x-end', `${xEnd}px`);
            confetti.style.setProperty('--y-end', `${yEnd}px`);
            confetti.style.setProperty('--rotate-end', `${rotateEnd}deg`);

            confettiContainer.appendChild(confetti);

            // Remove o confete do DOM após a animação para não sobrecarregar
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});