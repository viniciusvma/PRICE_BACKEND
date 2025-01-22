const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const getDolarValue = async () => {
  try {
    const response = await axios.get('https://v6.exchangerate-api.com/v6/4685a56b48b0a35e5b4f905f/latest/USD');
    return response.data.conversion_rates.BRL; // Valor do Dólar em reais (BRL)
  } catch (error) {
    console.error('Erro ao obter a cotação do dólar:', error);
    return null;
  }
};

const arredondar = (valor, casasDecimais = 2) => {
  return parseFloat(valor.toFixed(casasDecimais));
};

// Rota de cálculo
app.post('/calculate', async (req, res) => {
  const { tonelada } = req.body;

  if (!tonelada) {
    return res.status(400).json({ error: 'O valor da tonelada é obrigatório.' });
  }

  try {
    const B4 = 1.415; // 141,50% FIXO
    const B6 = 0.0425; // 4,25% FIXO
    const B8 = 80; // R$80,00 FIXO

    // Obter o valor do dólar em tempo real
    const B5 = await getDolarValue();
    if (!B5) {
      return res.status(500).json({ error: 'Erro ao obter o valor do dólar.' });
    }

    // Cálculos com arredondamento
    const C4 = arredondar(tonelada * B4, 2); 
    const C5 = arredondar(C4 * B5, 2); 
    const C6 = arredondar(C5 * B6, 2); 
    const C7 = arredondar(C5 - C6, 2); 
    const C9 = arredondar((C7 + B8) / 1000, 4); 

    res.json({ C4, C5, C6, C7, C9 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
