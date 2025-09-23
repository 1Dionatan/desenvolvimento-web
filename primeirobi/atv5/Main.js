const readlineSync = require('readline-sync');

const produtos = [
  { id: 1, nome: 'Cafe', preco: 5.50 },
  { id: 2, nome: 'Bolo de Chocolate', preco: 12.00 },
  { id: 3, nome: 'Suco de Laranja', preco: 8.00 },
];

const mesas = {};

function adicionarProduto() {
  const nome = readlineSync.question("Digite o nome do produto:");
  const preco = parseFloat(readlineSync.question("Digite o preco do produto:"));
  const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
  produtos.push({ id: novoId, nome: nome, preco: preco });
  console.log(`Produto "${nome}" adicionado com sucesso!`);
}

function excluirProduto() {
  const id = parseInt(readlineSync.question("Digite o ID do produto para excluir:"));
  const indice = produtos.findIndex(p => p.id === id);
  if (indice !== -1) {
    const nomeProduto = produtos[indice].nome;
    produtos.splice(indice, 1);
    console.log(`Produto "${nomeProduto}" excluido com sucesso.`);
  } else {
    console.log(`Produto com ID ${id} nao encontrado.`);
  }
}

function listarProdutos() {
  console.log("\n--- PRODUTOS DISPONIVEIS ---");
  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }
  produtos.forEach(p => console.log(`${p.id}. ${p.nome} - R$${p.preco.toFixed(2)}`));
}

function fazerPedido() {
  const numeroMesa = readlineSync.question("Digite o numero da mesa:");
  if (!numeroMesa) {
    console.log("Numero da mesa invalido.");
    return;
  }

  if (!mesas[numeroMesa]) {
    mesas[numeroMesa] = [];
  }
  
  let continuar = true;
  while (continuar) {
    listarProdutos();
    const idProduto = parseInt(readlineSync.question("Digite o ID do produto (ou 0 para encerrar o pedido):"));
    if (idProduto === 0) {
      continuar = false;
      continue;
    }

    const produtoEncontrado = produtos.find(p => p.id === idProduto);
    if (produtoEncontrado) {
      const quantidade = parseInt(readlineSync.question(`Quantidade de "${produtoEncontrado.nome}":`));
      if (quantidade > 0) {
        mesas[numeroMesa].push({
          id: produtoEncontrado.id,
          nome: produtoEncontrado.nome,
          preco: produtoEncontrado.preco,
          quantidade: quantidade
        });
        console.log(`Adicionado: ${quantidade}x ${produtoEncontrado.nome} para a Mesa ${numeroMesa}`);
      }
    } else {
      console.log("ID de produto invalido. Tente novamente.");
    }
  }
  console.log(`Pedido para a Mesa ${numeroMesa} finalizado.`);
}

function fecharConta() {
  const numeroMesa = readlineSync.question("Digite o numero da mesa para fechar a conta:");
  const pedido = mesas[numeroMesa];

  if (!pedido || pedido.length === 0) {
    console.log(`Nao ha pedido para a Mesa ${numeroMesa}.`);
    return;
  }

  const subtotal = pedido.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const percentualGorjeta = 10;
  const valorGorjeta = subtotal * (percentualGorjeta / 100);
  const valorTotal = subtotal + valorGorjeta;
  
  console.log("\n--- DETALHES DO PEDIDO ---");
  console.log(`Mesa: ${numeroMesa}`);
  console.log("Itens do Pedido:");
  pedido.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nome} (${item.quantidade}x) - R$${(item.preco * item.quantidade).toFixed(2)}`);
  });
  console.log(`Subtotal: R$${subtotal.toFixed(2)}`);
  console.log(`Gorjeta (${percentualGorjeta}%): R$${valorGorjeta.toFixed(2)}`);
  console.log(`Valor Total: R$${valorTotal.toFixed(2)}`);
  console.log("-------------------");
  
  let acao = readlineSync.question("Deseja confirmar a conta, remover um item, ou cancelar? (confirmar/remover/cancelar)");
  acao = acao ? acao.toLowerCase() : '';

  if (acao === 'remover') {
    const itemIndex = parseInt(readlineSync.question("Digite o numero do item que deseja remover (da lista acima):")) - 1;
    if (itemIndex >= 0 && itemIndex < pedido.length) {
      const itemRemovido = pedido.splice(itemIndex, 1)[0];
      console.log(`Item "${itemRemovido.nome}" removido do pedido.`);

      fecharConta(); 
    } else {
      console.log("Numero de item invalido.");
      fecharConta();
    }
  } else if (acao === 'confirmar') {
    console.log(`\nConta da Mesa ${numeroMesa} fechada com sucesso. Valor total: R$${valorTotal.toFixed(2)}`);
    delete mesas[numeroMesa];
  } else {
    console.log("Acao cancelada. A conta nao foi fechada.");
  }
}

function menuPrincipal() {
  let encerrar = false;
  while (!encerrar) {
    console.log(`
      --- MENU PRINCIPAL ---
      1. Adicionar Produto
      2. Excluir Produto
      3. Listar Produtos
      4. Fazer Pedido
      5. Fechar Conta
      6. Sair
    `);
    
    const opcao = readlineSync.question("Digite o numero da opcao desejada:");

    switch (opcao) {
      case '1':
        adicionarProduto();
        break;
      case '2':
        excluirProduto();
        break;
      case '3':
        listarProdutos();
        break;
      case '4':
        fazerPedido();
        break;
      case '5':
        fecharConta();
        break;
      case '6':
        encerrar = true;
        console.log("Sistema encerrado.");
        break;
      default:
        console.log("Opcao invalida. Por favor, digite um numero de 1 a 6.");
    }
  }
}

menuPrincipal();