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
    tx_email: "Alberta.Weber@gmail.com",
    wallets: [] 
  },
  {
    id_user: "v3jPQXjSkdb5aJeL2aLH42vXt",
    tx_document: "12345678901",
    tx_name: "Carlos Alberto da Silva",
    tx_email: "carlos.silva@gmail.com",
    wallets: [ 
      {
        id_wallet: "cd67ea1f938a67309cde",
        tx_name: "Carteira Itaú",
        tx_document: "987.654.321-00"
      },
      {
        id_wallet: "xy12ea1f93aa12309bce",
        tx_name: "Carteira Banco do Brasil",
        tx_document: "123.456.789-01"
      }
    ]
  },
  {
    id_user: "h7yVXWoNfZd2lTgI8cDL39yUh",
    tx_document: "98765432100",
    tx_name: "Maria Clara de Souza",
    tx_email: "maria.clara@gmail.com",
    wallets: [ 
      {
        id_wallet: "cd67ea1f938a67309cde",
        tx_name: "Carteira Itaú",
        tx_document: "987.654.321-00"
      },
      {
        id_wallet: "xy12ea1f93aa12309bce",
        tx_name: "Carteira Banco do Brasil",
        tx_document: "123.456.789-01"
      },
      {
        id_wallet: "xy12ea1f93aa12309bce",
        tx_name: "Carteira Banco do Brasil",
        tx_document: "123.456.789-01"
      },
      {
        id_wallet: "xy12ea1f93aa12309bce",
        tx_name: "Carteira Banco do Brasil",
        tx_document: "123.456.789-01"
      }
    ]
  }
];

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
  console.log(`Searching for user with email: ${email}`);

  // Filtra o primeiro usuário que corresponde ao email fornecido
  const user = users.find(user => user.tx_email === email);

  if (user) {
    // Formata o retorno para incluir "wallets"
    const formattedUser = {
      id_user: user.id_user,
      document: user.tx_document,
      name: user.tx_name,
      wallets: user.wallets // Inclui a lista de wallets do usuário
    };

    console.log('User found:', formattedUser);
    res.json(formattedUser); // Retorna um único objeto de usuário
  } else {
    console.log('No user found');
    res.status(404).json({ message: 'User not found' }); // Retorna um erro 404 caso o usuário não seja encontrado
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
    uid: 'r8jYP3f3KxX7dPG8Ebf61XyNwY53', // Gerado aleatoriamente
    wallets: [] // Iniciando com uma lista de wallets vazia
  };

  console.log('User created:', newUser);

  // Responder com o novo usuário criado
  res.json(newUser);
});

// POST: link-user-to-wallet
app.post('/cms/v1/link-user-to-wallet', (req, res) => {
  const { userId, walletId } = req.body;
  console.log(`Linking user ${userId} to wallet ${walletId}`);

  // Encontrar o usuário pelo ID
  const user = users.find(u => u.id_user === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Encontrar a wallet pelo ID
  const wallet = wallets.find(w => w.id_wallet === walletId);
  if (!wallet) {
    return res.status(404).json({ error: "Wallet not found" });
  }

  // Verificar se o usuário já está vinculado a essa wallet
  const isWalletLinked = user.wallets.some(w => w.id_wallet === walletId);
  if (isWalletLinked) {
    return res.status(400).json({ error: "User is already linked to this wallet" });
  }

  // Vincular a wallet ao usuário
  user.wallets.push({
    id_wallet: wallet.id_wallet,
    tx_name: wallet.tx_name,
    tx_document: wallet.tx_document
  });

  console.log(`User ${userId} linked to wallet ${walletId}`);
  res.json({ message: "User linked to wallet", user });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
