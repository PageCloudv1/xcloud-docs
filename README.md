<div align="center">

# xCloud Docs

**📚 Documentação completa da xCloud Platform**

[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com/PageCloudv1/xcloud-docs)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Deploy](https://github.com/PageCloudv1/xcloud-docs/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/PageCloudv1/xcloud-docs/actions/workflows/deploy-docs.yml)

**🌐 [Acesse a Documentação Completa](https://pagecloudv1.github.io/xcloud-docs/)**

</div>

---

## 🎯 Ecossistema xCloud Platform

A xCloud Platform é composta por um conjunto de repositórios projetados para trabalhar em conjunto, fornecendo uma experiência de desenvolvimento completa e integrada.

| Repositório | Descrição |
|---|---|
| **[xcloud-platform](https://github.com/PageCloudv1/xcloud-platform)** | Core da plataforma, orquestrando build, deploy e gerenciamento. |
| **[xcloud-cli](https://github.com/PageCloudv1/xcloud-cli)** | Interface de linha de comando em Go para interagir com a plataforma. |
| **[xcloud-dashboard](https://github.com/PageCloudv1/xcloud-dashboard)** | Interface web em React para gerenciamento de projetos e analytics. |
| **[xcloud-runtime](https://github.com/PageCloudv1/xcloud-runtime)** | Runtime serverless para funções em Python, Node.js e Go. |
| **[xcloud-docs](https://github.com/PageCloudv1/xcloud-docs)** | Documentação completa da plataforma. |
| **[xcloud-templates](https://github.com/PageCloudv1/xcloud-templates)** | Templates de projetos prontos para uso. |
| **[xcloud-components](https://github.com/PageCloudv1/xcloud-components)** | Marketplace de componentes de UI e integrações. |
| **[xcloud-examples](https://github.com/PageCloudv1/xcloud-examples)** | Projetos de exemplo e demonstrações. |
| **[xcloud-bot](https://github.com/PageCloudv1/xcloud-bot)** | Assistente de IA para operações DevOps. |
| **[xcloud-containers](https://github.com/PageCloudv1/xcloud-containers)** | Configurações de contêineres Podman para o ambiente de desenvolvimento. |

---

## 📚 About This Documentation

This repository contains the complete documentation for the xCloud Platform ecosystem. The documentation is built with [Docusaurus](https://docusaurus.io/) and automatically deployed to GitHub Pages.

### 🎯 What's Included

- **Getting Started Guides** - Quick start tutorials and setup instructions
- **API Reference** - Complete REST API documentation
- **CLI Reference** - Command-line interface documentation
- **Architecture Guides** - System design and component architecture
- **Developer Guides** - In-depth tutorials and best practices
- **Reference Materials** - Changelogs, security policies, and more

### 🌐 Live Documentation

Visit the live documentation at: **[https://pagecloudv1.github.io/xcloud-docs/](https://pagecloudv1.github.io/xcloud-docs/)**

---

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via the [deploy-docs.yml](.github/workflows/deploy-docs.yml) workflow.

### Manual Deployment

If you need to deploy manually:

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

---

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/setup/development/como-contribuir.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
