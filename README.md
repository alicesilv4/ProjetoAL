# ProjetoAL(Álgebra Linear)

# 🏗️ Engenharia Civil & Álgebra Linear Apps

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Tecnologia](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Matéria](https://img.shields.io/badge/Disciplina-Álgebra%20Linear-orange)

Este repositório contém duas aplicações web desenvolvidas como projeto prático para a disciplina de **Álgebra Linear** aplicada à **Engenharia Civil**.

O objetivo é demonstrar como conceitos matemáticos (modelagem linear, matrizes, transformações e produto interno) são fundamentais para resolver problemas reais de engenharia e diagnóstico de estruturas.

---

## 🚀 Acesso aos Projetos (Demo)

Você pode testar as aplicações diretamente pelo navegador através dos links abaixo:

| Aplicação | Descrição | Link de Acesso |
| :--- | :--- | :--- |
| **App 1** | 🧱 Estimador de Material (Alvenaria) | [**Acessar App 1**](https://alicesilv4.github.io/App1_EstimadorMaterial/) |
| **App 2** | 📉 MatrixPatol (Análise de Fissuras) | [**Acessar App 2**](https://alicesilv4.github.io/ProjetoAL/App2_MatrixPatol/) |

---

## 📱 Detalhes dos Projetos

### 1. Estimador de Consumo para Alvenaria

Ferramenta de orçamentação para cálculo de blocos em vedações verticais.

* **Problema de Engenharia:** Cálculo manual de insumos sujeito a erros e falta de padronização no índice de perdas.
* **Fundamentação Matemática (Álgebra Linear):**
    * Modelagem de uma função linear $f(x, y)$ que relaciona grandezas geométricas (dimensões da parede) com grandezas discretas (quantidade de material).
    * Aplicação de **Transformação Linear por Escalar** ($k = 1.10$) para representar matematicamente o coeficiente de segurança (perdas e quebras de 10%).
* **Funcionalidades:**
    * Cálculo automático de área.
    * Seleção de tipologia de bloco.
    * Arredondamento normativo (teto).

### 2. MatrixPatol: Diagnóstico Matricial de Fissuras

Sistema de visão computacional simplificada para classificação de patologias estruturais.

* **Problema de Engenharia:** Identificação da geometria de fissuras (Vertical, Horizontal, Diagonal, Cruzada) para diagnóstico preliminar de causas (ex: cortante vs. flexão).
* **Fundamentação Matemática (Álgebra Linear):**
    * Tratamento da imagem como uma **Matriz Binária** ($M_{n \times n}$) no espaço vetorial real.
    * Uso do conceito de **Produto Interno de Matrizes** (similaridade) definido pelo **Traço do Produto da Transposta**:
    $$\langle A, B \rangle = \text{tr}(A^T B)$$
    * O algoritmo compara a matriz de entrada (desenho do usuário) com uma base canônica de matrizes de referência para determinar a maior projeção (score).
* **Funcionalidades:**
    * Canvas interativo para desenho da patologia.
    * Conversão instantânea Desenho $\to$ Matriz.
    * Diagnóstico automatizado com base no cálculo do Traço.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica.
* **CSS3:** Estilização responsiva e temas modernos (Clean & Dark Mode).
* **JavaScript (Vanilla):** Lógica matemática, manipulação de DOM e Canvas API.

---

## 📦 Como rodar localmente

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/alicesilv4/ProjetoAL.git](https://github.com/alicesilv4/ProjetoAL.git)
    ```
2.  Navegue até a pasta do projeto desejado (`App1...` ou `App2...`).
3.  Abra o arquivo `index.html` no seu navegador de preferência.

---

## ✒️ Autores

* **Alice Silva** - *Desenvolvimento e Documentação*

---
