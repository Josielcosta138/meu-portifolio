/* eslint-disable no-undef */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import validator from 'validator';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    sucesso: false,
    mensagem: 'Muitas tentativas. Tente novamente mais tarde.'
  }
});

app.post('/api/contato', limiter, async (req, res) => {
  try {

    const {
      nome,
      empresa,
      whatsapp,
      email,
      motivo,
      observacoes
    } = req.body;

    
   

    const nomeLimpo = validator.escape(nome);
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

👤 ${nome}
🏢 ${empresaLimpa || "Não informado"}
📱 ${whatsapp}
📧 ${email}

📌 Motivo:
${emojiMotivo[motivo]} ${motivo}

📝 Observações:
${observacoes || "Nenhuma observação"}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: texto
      }
    );

    return res.status(200).json({
      sucesso: true
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      sucesso: false
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor rodando na porta ${process.env.PORT}`
  );
});