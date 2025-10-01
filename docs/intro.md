---
sidebar_position: 1
---

# Bem-vindo à xCloud Platform

Bem-vindo à documentação oficial da **xCloud Platform** - a moderna plataforma de desenvolvimento e deploy que acelera a criação de aplicações web e mobile.

## 🚀 O que é a xCloud Platform?

A xCloud Platform é um ecossistema completo de ferramentas e serviços que permite aos desenvolvedores criar, testar e fazer deploy de aplicações de forma rápida e eficiente. Com suporte a múltiplas linguagens e frameworks, a plataforma oferece:

- **🎯 Deploy Instantâneo**: Faça deploy de aplicações em segundos
- **⚡ Serverless Functions**: Execute código sob demanda sem gerenciar servidores
- **🔧 CLI Poderosa**: Interface de linha de comando completa em Go
- **📊 Dashboard Intuitivo**: Gerencie seus projetos via interface web
- **🎨 Marketplace de Componentes**: Acesse templates e componentes reutilizáveis
- **🌍 CDN Global**: Entrega rápida de conteúdo em todo o mundo

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js 20+** instalado ([nodejs.org](https://nodejs.org))
- **Git** configurado em sua máquina
- Uma conta na **xCloud Platform** ([xcloud.io](https://xcloud.io))

## 🎯 Primeiros Passos

### 1. Instale a xCloud CLI

```bash
npm install -g xcloud-cli
```

### 2. Faça login na sua conta

```bash
xcloud login
```

### 3. Crie seu primeiro projeto

```bash
xcloud init meu-projeto --template nextjs
cd meu-projeto
```

### 4. Inicie o desenvolvimento local

```bash
xcloud dev
```

### 5. Faça seu primeiro deploy

```bash
xcloud deploy
```

🎉 **Pronto!** Sua aplicação está no ar em poucos minutos.

## 📚 Explore a Documentação

### 🚀 Para Iniciantes

- **[Guia de Primeiros Passos](./guides/primeiros-passos.md)** - Tutorial completo do zero ao deploy
- **[xCloud CLI - Guia Completo](./guides/xcloud-cli-guia-completo.md)** - Aprenda todos os comandos da CLI
- **[Domínio Customizado](./guides/dominio-customizado.md)** - Configure seu próprio domínio

### 🏗️ Arquitetura

- **[Visão Geral da Arquitetura](./architecture/arquitetura.md)** - Entenda como a plataforma funciona
- **[Estrutura do Projeto](./architecture/estrutura-do-projeto.md)** - Organize seus projetos
- **[Arquitetura de Componentes](./architecture/arquitetura-de-componentes.md)** - Sistema de componentes

### ⚡ Desenvolvimento

- **[Funções Serverless](./guides/funcoes-serverless.md)** - Crie APIs e lógica de backend
- **[GitHub Actions](./guides/github-actions-workflows.md)** - Automação de CI/CD
- **[Guias de Migração](./guides/migration/migracao-cli-go.md)** - Migre de outras plataformas

### 📖 Referência

- **[API Reference](./api/introduction.md)** - Documentação completa da API REST
- **[CLI Reference](./cli/introduction.md)** - Todos os comandos disponíveis
- **[Modelos de Dados](./api/data-models.md)** - Estrutura de dados da plataforma

## 🎯 Ecossistema xCloud

A xCloud Platform é composta por vários repositórios que trabalham em conjunto:

| Repositório | Descrição |
|------------|-----------|
| [xcloud-platform](https://github.com/PageCloudv1/xcloud-platform) | Core da plataforma, orquestrando build, deploy e gerenciamento |
| [xcloud-cli](https://github.com/PageCloudv1/xcloud-cli) | Interface de linha de comando em Go |
| [xcloud-dashboard](https://github.com/PageCloudv1/xcloud-dashboard) | Interface web em React para gerenciamento |
| [xcloud-runtime](https://github.com/PageCloudv1/xcloud-runtime) | Runtime serverless para Python, Node.js e Go |
| [xcloud-docs](https://github.com/PageCloudv1/xcloud-docs) | Documentação completa (você está aqui!) |
| [xcloud-templates](https://github.com/PageCloudv1/xcloud-templates) | Templates de projetos prontos para uso |
| [xcloud-components](https://github.com/PageCloudv1/xcloud-components) | Marketplace de componentes de UI |
| [xcloud-examples](https://github.com/PageCloudv1/xcloud-examples) | Projetos de exemplo e demonstrações |

## 🆘 Precisa de Ajuda?

- 📚 **Documentação**: Você está aqui!
- 💬 **Discord**: [discord.gg/xcloud](https://discord.gg/xcloud)
- 🐛 **Issues**: [github.com/PageCloudv1/xcloud-platform/issues](https://github.com/PageCloudv1/xcloud-platform/issues)
- 📧 **Email**: suporte@xcloud.io

## 🚀 Próximos Passos

Agora que você conhece a xCloud Platform, escolha seu caminho:

1. **Novo na plataforma?** → Comece com o [Guia de Primeiros Passos](./guides/primeiros-passos.md)
2. **Desenvolvedor experiente?** → Explore a [Referência da API](./api/introduction.md)
3. **Quer contribuir?** → Veja nosso [Guia de Contribuição](./setup/development/como-contribuir.md)

---

**💡 Dica**: Use o campo de busca acima para encontrar rapidamente o que você precisa!
