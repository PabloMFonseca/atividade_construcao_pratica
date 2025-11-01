import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Lista de produtos fixos (mock)
const produtos = [
  {
    id: 1,
    nome: "Fone Bluetooth Premium",
    descricao: "Fone de ouvido sem fio com qualidade de som excelente",
    preco: 199.9,
    imagem:
      "https://grupomateus.vtexassets.com/arquivos/ids/4277626-1200-1200?v=638894764984400000&width=1200&height=1200&aspect=true",
  },
  {
    id: 2,
    nome: "Smartwatch Inteligente",
    descricao: "Relógio inteligente com monitor de saúde e notificações",
    preco: 349.9,
    imagem: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-970-80.jpg.webp",
  },
  {
    id: 3,
    nome: "Câmera Profissional HD",
    descricao: "Câmera Sony profissional com resolução Full HD e zoom digital",
    preco: 4999.9,
    imagem: "https://pro.sony/s3/2025/01/12102234/1000x700.png",
  },
];

// Rota GET -> retorna produtos
app.get("/api/produtos", (req, res) => {
  res.json(produtos);
});

// Rota POST -> salvar inscrição
app.post("/api/inscricao", (req, res) => {
  const { email_inscrito } = req.body;

  if (!email_inscrito) {
    return res.status(400).json({ message: "E-mail é obrigatório." });
  }

  const sql = "INSERT INTO inscritos (email_inscrito) VALUES (?)";
  db.query(sql, [email_inscrito], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao salvar o e-mail no banco de dados." });
    } else {
      res.json({ message: "Inscrição realizada com sucesso!" });
    }
  });
});

// Inicializa servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
