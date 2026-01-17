document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Configuração do Canvas (Desenho) ---
    const canvas = document.getElementById('fissura-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Configura o "pincel"
    ctx.lineWidth = 15; // Espessura grossa para facilitar a deteção
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black'; // A fissura é preta

    // Funções de desenho para Rato
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; draw(e); });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    canvas.addEventListener('mousemove', draw);

    // Funções de desenho para Touch (Telemóvel)
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; drawTouch(e); });
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', drawTouch);

    function draw(e) {
        if (!isDrawing) return;
        // Pega a posição correta do rato relativa ao canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function drawTouch(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Impede a página de rolar
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Botão Limpar
    document.getElementById('btn-limpar').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // Reinicia o caminho
        document.getElementById('resultado').classList.add('hidden');
    });

    // --- 2. Lógica de Álgebra Linear (O Requisito) ---

    document.getElementById('btn-analisar').addEventListener('click', () => {

        // Passo A: Converter o desenho em uma Matriz Numérica Pequena (20x20)
        // Reduzimos a resolução (downsampling) para facilitar a matemática
        const resolution = 20;
        const matrixA = getMatrixFromCanvas(resolution);

        // Se a matriz estiver vazia (tudo branco), avisa
        if (matrixA.flat().reduce((a, b) => a + b, 0) === 0) {
            alert("Por favor, desenhe uma fissura primeiro!");
            return;
        }

        // Passo B: Definir o Banco de Dados (Matrizes B)
        // Criamos as matrizes ideais matematicamente
        const dataBase = {
            'Vertical': createVerticalMatrix(resolution),
            'Horizontal': createHorizontalMatrix(resolution),
            'Diagonal': createDiagonalMatrix(resolution),
            'Cruzada': createCrossMatrix(resolution)
        };

        // Passo C: Calcular o Traço do Produto Interno (Similaridade)
        // Score = Somatório(A[i][j] * B[i][j])
        let bestScore = -1;
        let bestType = '';
        const scoresList = document.getElementById('lista-scores');
        scoresList.innerHTML = ''; // Limpa lista anterior

        for (const [type, matrixB] of Object.entries(dataBase)) {

            // Aqui está a mágica da Álgebra Linear aplicada ao código:
            const score = calculateTraceProduct(matrixA, matrixB);

            // Exibe o detalhe matemático na tela
            const li = document.createElement('li');
            li.innerHTML = `<span>${type}</span> <span>Score: ${score}</span>`;
            scoresList.appendChild(li);

            // Verifica quem venceu
            if (score > bestScore) {
                bestScore = score;
                bestType = type;
            }
        }

        // Passo D: Mostrar o Resultado
        document.getElementById('tipo-fissura').textContent = bestType;

        // Define a "causa provável" baseada na engenharia
        const causas = {
            'Vertical': 'Sobrecarga ou retração térmica.',
            'Horizontal': 'Corrosão de armaduras ou infiltração.',
            'Diagonal': 'Esforço cortante (cisalhamento).',
            'Cruzada': 'Recalque de fundação ou impacto central.'
        };
        document.getElementById('causa-provavel').textContent = causas[bestType];

        document.getElementById('resultado').classList.remove('hidden');
    });

    // --- Funções Auxiliares Matemáticas ---

    function getMatrixFromCanvas(res) {
        // Cria uma matriz vazia
        let matrix = Array(res).fill().map(() => Array(res).fill(0));

        // Pega os pixels brutos do canvas
        // O canvas tem 200x200, vamos "resumir" para 20x20 (blocos de 10px)
        const blockSize = 200 / res;

        for (let y = 0; y < res; y++) {
            for (let x = 0; x < res; x++) {
                // Analisa o pixel central do bloco
                const pixelData = ctx.getImageData(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, 1, 1).data;
                // pixelData[3] é o Alpha (transparência). Se for > 0, tem tinta preta ali.
                if (pixelData[3] > 0) {
                    matrix[y][x] = 1; // 1 = Fissura
                } else {
                    matrix[y][x] = 0; // 0 = Fundo
                }
            }
        }
        return matrix;
    }

    function calculateTraceProduct(matA, matB) {
        // Na prática computacional, o Traço de (A transposta * B) para matrizes binárias
        // é a soma da multiplicação ponto a ponto.
        // Se ambos forem 1 (sobreposição), soma 1. Se um for 0, soma 0.
        let sum = 0;
        for (let i = 0; i < matA.length; i++) {
            for (let j = 0; j < matA[i].length; j++) {
                sum += matA[i][j] * matB[i][j];
            }
        }
        return sum;
    }

    // --- Geradores de Matrizes Canónicas (Base de Dados) ---

    function createVerticalMatrix(res) {
        // Cria uma linha vertical no meio (coluna 9 e 10)
        return Array(res).fill().map((_, y) =>
            Array(res).fill().map((_, x) => (x >= res / 2 - 2 && x <= res / 2 + 2) ? 1 : 0)
        );
    }

    function createHorizontalMatrix(res) {
        // Cria uma linha horizontal no meio
        return Array(res).fill().map((_, y) =>
            Array(res).fill().map((_, x) => (y >= res / 2 - 2 && y <= res / 2 + 2) ? 1 : 0)
        );
    }

    function createDiagonalMatrix(res) {
        // Cria uma diagonal principal
        return Array(res).fill().map((_, y) =>
            Array(res).fill().map((_, x) => (Math.abs(x - y) <= 2) ? 1 : 0)
        );
    }

    function createCrossMatrix(res) {
        // Soma da Diagonal Principal com a Secundária
        return Array(res).fill().map((_, y) =>
            Array(res).fill().map((_, x) => (Math.abs(x - y) <= 2 || Math.abs(x + y - (res - 1)) <= 2) ? 1 : 0)
        );
    }
});