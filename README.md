# Maravilhas d'Leda — Cardápio Digital

Aplicação web estática para apresentar o cardápio digital da Maravilhas d'Leda, permitindo que clientes visualizem refeições, lanches e sucos, busquem itens e façam pedidos diretamente pelo WhatsApp.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- SVG inline para ícones
- Google Fonts para tipografia
- WhatsApp Link para pedidos

## Funcionalidades

- Exibição do cardápio por categorias: refeições, lanches naturais e sucos
- Busca em tempo real de pratos e itens
- Destaque automático do dia da semana atual
- Aviso visual de fechamento aos domingos
- Navegação interna com destaque de seção ao rolar a página
- Botões de pedido que abrem o WhatsApp com mensagem pré-preenchida
- Layout responsivo para diferentes tamanhos de tela

## Como Executar o Projeto

### Pré-requisitos

- Navegador moderno (Chrome, Edge, Firefox ou similar)
- Opcional: Python 3 para servir os arquivos localmente

### Passo a passo

1. Acesse a pasta do projeto:

```bash
cd /home/gabriel_robson/Documentos/projetos/leda_cardapio
```

2. Abra o arquivo index.html diretamente no navegador:

```bash
xdg-open index.html
```

3. Ou, para uma execução local mais consistente, inicie um servidor simples:

```bash
python3 -m http.server 8000
```

4. Acesse no navegador:

```text
http://localhost:8000
```

## Estrutura de Pastas

```text
leda_cardapio/
├── index.html
├── style.css
├── script.js
└── README.md
```
