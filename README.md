# Drip Store

Frontend de uma loja virtual desenvolvido com React e Vite. A aplicação apresenta catálogo de produtos, busca, filtros, página de detalhes, carrinho persistente e autenticação integrada ao Backend GT3.

## Tecnologias

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- React Icons
- Local Storage para persistência do carrinho

## Funcionalidades

- Catálogo de produtos com busca, filtros por categoria, marca, gênero e estado, além de ordenação por preço.
- Página de detalhes com galeria, seleção de tamanho e cor, e produtos relacionados.
- Carrinho persistente entre recarregamentos da página.
- Cadastro de usuário e login com JWT por meio da API Backend GT3.
- Simulação de finalização de pedido.

## Requisitos

- Node.js 20 ou superior
- npm
- Backend GT3 em execução para usar cadastro e login

## Instalação

```bash
git clone https://github.com/PauloVianaTech/ecommerce-drip-store.git
cd ecommerce-drip-store
npm install
```

## Configuração

Copie `.env.example` para `.env.local` e ajuste a URL da API se necessário:

```dotenv
VITE_API_URL=http://localhost:3001/v1
```

O valor padrão já aponta para o Backend GT3 local.

## Execução

```bash
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Validação

```bash
npm run lint
npm run build
```

## Limitações atuais

Os dados do catálogo são locais e o checkout é uma simulação. O backend é utilizado para cadastro e autenticação; produtos e pedidos ainda não são persistidos pela interface.

## Licença

Este projeto é destinado a estudo.
