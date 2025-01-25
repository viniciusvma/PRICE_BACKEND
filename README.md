# Backend - Calculadora de Preço EX

Este é o backend de um aplicativo para calcular o preço de tonelada em reais, com base na cotação atual do dólar. A aplicação foi construída com Express.js e Axios para fazer requisições HTTP.

## Funcionalidades

- **Obter cotação do dólar**: O servidor realiza uma requisição à API "AwesomeAPI" para buscar a cotação atual do dólar.
- **Calcular preço por quilograma**: O servidor realiza um cálculo baseado em um valor fixo e na cotação do dólar para determinar o preço por quilograma de uma tonelada.
- **Rotas**:
  - **GET /dolar**: Retorna a cotação atual do dólar.
  - **POST /calculate**: Recebe o valor da tonelada e retorna o preço por quilograma.

## Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **CORS**: Middleware para permitir solicitações entre diferentes domínios.

## Como Funciona

1. **GET /dolar**: Retorna a cotação do dólar em tempo real.
2. **POST /calculate**:
   - O usuário envia o valor da tonelada (em dólares).
   - O servidor calcula o preço por quilograma utilizando a fórmula fornecida e retorna o valor calculado.
