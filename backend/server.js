/* eslint-disable no-undef */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import validator from 'validator';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();


app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({
    status: 'online'
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    sucesso: false,
    mensagem: 'Muitas tentativas. Tente novamente mais tarde.'
  }
});

app.post('/api/contato', limiter, async (req, res) => {
  console.log('Nova requisição recebida:', {
    data: new Date().toISOString(),
    ip: req.ip,
    nome: req.body.nome,
    email: req.body.email
  });

  try {

    const {
      nome,
      empresa,
      whatsapp,
      email,
      motivo,
      observacoes
    } = req.body;

    
   

    const nomeLimpo = validator.escape(nome || '');
    const empresaLimpa = validator.escape(empresa || '');
    const observacoesLimpa = validator.escape(observacoes || '');

    if (req.body.website) {
      return res.status(400).json({
        sucesso: false
      });
    }

    if (!nomeLimpo || nomeLimpo.length > 100) {
      return res.status(400).json({
        sucesso: false
      });
    }

    if (!email || email.length > 150) {
      return res.status(400).json({
        sucesso: false
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'E-mail inválido'
      });
    }
        if (!nomeLimpo || !email || !whatsapp || !motivo) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha os campos obrigatórios'
      });
    }

    if (observacoesLimpa && observacoesLimpa.length > 500) {
      return res.status(400).json({
        sucesso: false
      });
    }

    const emojiMotivo = {
      "Vaga de Emprego": "💼",
      "Freelancer": "💻",
      "Parceria": "🤝",
      "Outro": "📌"
    };

    const texto = `
📩 Novo contato do Portfólio

👤 ${nomeLimpo}
🏢 ${empresaLimpa || "Não informado"}
📱 ${whatsapp}
📧 ${email}

📌 Motivo:
${emojiMotivo[motivo]} ${motivo}

📝 Observações:
${observacoesLimpa || "Nenhuma observação"}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: texto
      }
      );
      console.log(
      `Mensagem enviada para Telegram: ${email}`
      );

    return res.status(200).json({
      sucesso: true
    });

  } catch (erro) {
    console.error(erro);
    console.error(
      'Erro ao enviar Telegram:',
      erro.response?.data || erro.message
)   ;

    return res.status(500).json({
      sucesso: false
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// app.listen(process.env.PORT, () => {
//   console.log(
//     `Servidor rodando na porta ${process.env.PORT}`
//   );
// });