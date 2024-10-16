const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Mock de dados
const wallets = [
  {
    id_wallet: "ad56da8f434c42899bcd",
    id_user: null,
    id_company: null,
    id_wallet_type: null,
    tx_agency: "0142",
    tx_bank: "389 - Banco Mercantil do Brasil",
    tx_bank_account: "01011203-5",
    tx_document: "094.373.516-51",
    tx_email: "patrus@gmail.com",
    tx_name: "Antonio Patrus de Sousa Neto"
  },
  {
    id_wallet: "bd34da9f672b52987ace",
    id_user: "gzD68IiBTDm0taj-sALgEgHH",
    id_company: null,
    id_wallet_type: null,
    tx_agency: "1234",
    tx_bank: "001 - Banco do Brasil",
    tx_bank_account: "23456789-0",
    tx_document: "123.456.789-10",
    tx_email: "carlos.silva@gmail.com",
    tx_name: "Carlos Alberto da Silva"
  },
  {
    id_wallet: "cd67ea1f938a67309cde",
    id_user: "h7yVXWoNfZd2lTgI8cDL39yUh",
    id_company: "abc123company",
    id_wallet_type: "business",
    tx_agency: "5678",
    tx_bank: "341 - Itaú Unibanco",
    tx_bank_account: "98765432-1",
    tx_document: "987.654.321-00",
    tx_email: "maria.clara@gmail.com",
    tx_name: "Maria Clara de Souza"
  }
];

const users = [
  {
    id_user: "gzD68IiBTDm0taj-sALgEgHH",
    tx_document: "12345678922",
    tx_name: "Teste de integração",
    tx_email: "Alberta.Weber@gmail.com"
  },
  {
    id_user: "v3jPQXjSkdb5aJeL2aLH42vXt",
    tx_document: "12345678901",
    tx_name: "Carlos Alberto da Silva",
    tx_email: "carlos.silva@gmail.com"
  },
  {
    id_user: "h7yVXWoNfZd2lTgI8cDL39yUh",
    tx_document: "98765432100",
    tx_name: "Maria Clara de Souza",
    tx_email: "maria.clara@gmail.com"
  }
];

// Variável local para armazenar os usuários vinculados a wallets
let linkedUsers = [];

// Middleware para logar cada requisição
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  if (Object.keys(req.query).length > 0) {
    console.log('Query Params:', req.query);
  }
  next();
});

// GET: wallet-by-document
app.get('/cms/v1/wallet-by-document', (req, res) => {
  const document = req.query.document;
  console.log(`Searching for wallet with document: ${document}`);

  const wallet = wallets.find(w => w.tx_document === document);

  if (wallet) {
    console.log('Wallet found:', wallet);
    res.json(wallet);
  } else {
    console.log('Wallet not found');
    res.status(404).json({ message: 'Wallet not found' });
  }
});

// GET: list-users
app.get('/cms/v1/list-users', (req, res) => {
  const email = req.query.email;
  console.log(`Searching for users with email: ${email}`);

  const filteredUsers = users.filter(user => user.tx_email === email);

  if (filteredUsers.length > 0) {
    console.log('Users found:', filteredUsers);
    res.json({ users: filteredUsers });
  } else {
    console.log('No users found');
    res.json({ users: [] });
  }
});

// POST: create-user
app.post('/cms/v1/create-user', (req, res) => {
  const { email, phoneNumber, documentType, document, displayName, investorName, investorDocument, investorDocumentType } = req.body;
  console.log(`Creating new user with email: ${email}`);

  // Simulação de criação de usuário
  const newUser = {
    email,
    phoneNumber,
    documentType,
    document,
    displayName,
    investorName,
    investorDocument,
    investorDocumentType,
    uid: 'r8jYP3f3KxX7dPG8Ebf61XyNwY53' // Gerado aleatoriamente
  };

  console.log('User created:', newUser);

  // Responder com o novo usuário criado
  res.json(newUser);
});

// POST: link-user-to-wallet
app.post('/cms/v1/link-user-to-wallet', (req, res) => {
  const { userId, walletId } = req.body;
  console.log(`Linking user ${userId} to wallet ${walletId}`);

  // Verificar se o usuário já está vinculado a essa wallet
  const isUserLinked = linkedUsers.some(link => link.userId === userId && link.walletId === walletId);

  if (isUserLinked) {
    console.log('User is already linked to wallet');
    res.status(400).json({ error: "User is already linked to wallet" });
  } else {
    // Vincular usuário à wallet
    linkedUsers.push({ userId, walletId });
    console.log(`User ${userId} linked to wallet ${walletId}`);
    res.json({ message: "User linked to wallet" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
