---
sidebar_position: 1
---

# Introdução ao Tutorial

Vamos descobrir a **xCloud Platform em menos de 5 minutos**.

## Começando

Comece **criando um novo projeto**.

Ou **experimente a xCloud Platform imediatamente** através do nosso **[painel web](https://app.xcloud.io)**.

### O que você precisará

- [Node.js](https://nodejs.org/pt-br/download/) versão 20.0 ou superior:
  - Ao instalar o Node.js, é recomendado marcar todas as caixas de seleção relacionadas às dependências.

## Gerar um novo projeto

Gere um novo projeto xCloud usando a **CLI da plataforma**.

A CLI irá automaticamente configurar seu projeto após executar o comando:

```bash
npx @xcloud/cli create meu-projeto
```

Você pode digitar este comando no Prompt de Comando, PowerShell, Terminal ou qualquer outro terminal integrado do seu editor de código.

O comando também instala todas as dependências necessárias para executar sua aplicação xCloud.

## Iniciar seu projeto

Execute o servidor de desenvolvimento:

```bash
cd meu-projeto
npm run dev
```

O comando `cd` muda o diretório com o qual você está trabalhando. Para trabalhar com seu projeto xCloud recém-criado, você precisará navegar o terminal até lá.

O comando `npm run dev` constrói sua aplicação localmente e a serve através de um servidor de desenvolvimento, pronto para você visualizar em [http://localhost:3000/](http://localhost:3000/).

Abra `src/pages/index.tsx` e edite algumas linhas: o site **recarrega automaticamente** e exibe suas alterações.