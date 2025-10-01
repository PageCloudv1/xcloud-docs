# 📚 xCloud Platform Documentation

Documentação completa da **xCloud Platform** - Uma plataforma de computação em nuvem moderna e escalável.

## 🎯 **Quick Start**

### **🚀 Para Iniciantes:**

1. [Configuração de Desenvolvimento](setup/development/guia-do-desenvolvedor.md)
2. [Setup de GitHub Secrets](setup/github-secrets/inicio-rapido-secrets.md)
3. [Configuração de Workflows](setup/workflows/setup-completo-actions.md)

### **⚡ Para Desenvolvedores:**

1. [Guia de Contribuição](setup/development/como-contribuir.md)
2. [Testes Locais](guides/testing/teste-workflows-local.md)
3. [Migração para Go](guides/migration/migracao-cli-go.md)

## 📖 **Estrutura da Documentação**

### **🔧 Setup & Configuração**

- **[GitHub Secrets](setup/github-secrets/readme.md)** - Configuração de secrets para automações
- **[Workflows](setup/workflows/readme.md)** - Setup de GitHub Actions e CI/CD
- **[Development](setup/development/readme.md)** - Ambiente de desenvolvimento

### **📖 Guias**

- **[Testing](guides/testing/readme.md)** - Testes locais e automação
- **[Migration](guides/migration/readme.md)** - Guias de migração tecnológica

### **🏗️ Arquitetura**

- **[Architecture](architecture/readme.md)** - Documentação de arquitetura
- **[Project Structure](architecture/estrutura-do-projeto.md)** - Estrutura do projeto
- **[Components Architecture](architecture/arquitetura-de-componentes.md)** - Arquitetura de componentes

### **🛠️ Scripts & Templates**

- **[Scripts](scripts/readme.md)** - Scripts de automação e setup
- **[Templates](templates/readme.md)** - Templates e arquivos de exemplo

### **📋 Referência**

- **[Reference](reference/readme.md)** - Documentação de referência
- **[Security](reference/seguranca.md)** - Políticas de segurança
- **[Changelog](reference/changelog.md)** - Histórico de mudanças

## 🚀 **Configuração Rápida**

### **1. Configurar Secrets (5 minutos)**

```bash
# Cross-platform (Node.js - Recommended)
node docs/scripts/setup-github-secrets.js

# Windows PowerShell alternative
.\docs\scripts\setup-github-secrets.ps1 -Mode interactive
```

### **2. Testar Workflows Localmente**

```bash
# Instalar ferramentas de teste
npm install

# Executar testes locais
node docs/scripts/test-workflows.js
```

### **3. Configurar Ambiente de Desenvolvimento**

Siga o guia: [Guia para Desenvolvedores](setup/development/guia-do-desenvolvedor.md)

## 🎯 **Repositórios da xCloud Platform**

| Repositório | Descrição | Status |
|-------------|-----------|---------|
| **[xcloud-platform](https://github.com/PageCloudv1/xcloud-platform)** | Core da plataforma | ✅ Ativo |
| **[xcloud-cli](https://github.com/PageCloudv1/xcloud-cli)** | CLI em Go | ✅ Migrado |
| **[xcloud-dashboard](https://github.com/PageCloudv1/xcloud-dashboard)** | Dashboard React | ✅ Ativo |
| **[xcloud-runtime](https://github.com/PageCloudv1/xcloud-runtime)** | Runtime multi-linguagem | ✅ Ativo |
| **[xcloud-docs](https://github.com/PageCloudv1/xcloud-docs)** | Documentação | ✅ Ativo |
| **[xcloud-templates](https://github.com/PageCloudv1/xcloud-templates)** | Templates de projeto | ✅ Ativo |
| **[xcloud-components](https://github.com/PageCloudv1/xcloud-components)** | Componentes UI | ✅ Ativo |
| **[xcloud-examples](https://github.com/PageCloudv1/xcloud-examples)** | Exemplos e demos | ✅ Ativo |

## 🤖 **Automações Ativas**

### **✅ GitHub Actions**

- **CI/CD completo** em todos os 8 repositórios
- **Testes automatizados** multi-plataforma
- **Deploy automático** para Netlify
- **Publicação de containers** Podman

### **✅ Gemini AI**

- **Reviews automáticos** de Pull Requests
- **Análise de código** inteligente
- **Geração de issues** contextuais
- **Comentários automatizados**

### **✅ Segurança**

- **Scans de vulnerabilidades** Snyk
- **Análise de qualidade** SonarCloud
- **Cobertura de testes** Codecov
- **Secrets seguros** GitHub Secrets

## 📚 **Links Úteis**

- **[Contributing Guide](setup/development/como-contribuir.md)** - Como contribuir
- **[Code of Conduct](setup/development/codigo-de-conduta.md)** - Código de conduta
- **[Security Policy](reference/seguranca.md)** - Política de segurança
- **[Changelog](reference/changelog.md)** - Histórico de mudanças

## 🔍 **Encontrar Informações**

### **Setup & Configuração:**

- Configurar secrets → [GitHub Secrets Setup](setup/github-secrets/)
- Configurar workflows → [Workflows Setup](setup/workflows/)
- Ambiente de dev → [Development Setup](setup/development/)

### **Desenvolvimento:**

- Testar localmente → [Testing Guide](guides/testing/)
- Fazer deploy → [Deployment Guide](guides/deployment/)
- Migrar tecnologias → [Migration Guide](guides/migration/)

### **Arquitetura & Design:**

- Entender arquitetura → [Architecture](architecture/)
- Ver estrutura → [Project Structure](architecture/estrutura-do-projeto.md)
- Componentes → [Components Architecture](architecture/arquitetura-de-componentes.md)

---

## 📝 Log de Atualizações da Documentação

**⚠️ IMPORTANTE:** Este log registra todas as mudanças significativas na documentação centralizada.

### Histórico de Atualizações

- **01/10/2025** - Issue #31 atualizada - docs centralizadas como prioridade máxima
- **01/10/2025** - Estrutura base do Docusaurus verificada e funcionando
- **01/10/2025** - Página inicial (intro.md) atualizada com conteúdo específico da xCloud
- **01/10/2025** - Build e deploy automatizado via GitHub Actions confirmado funcionando
- **01/10/2025** - Documentação completa com 42+ arquivos markdown organizados
- **01/10/2025** - API Reference, CLI Reference e guias de arquitetura verificados

### Status das Fases

#### ✅ Fase 1: Estrutura Base (COMPLETO)
- [x] Setup Docusaurus - **Implementado e funcionando**
- [x] Arquitetura da documentação - **Estrutura organizada em categorias**
- [x] Templates padrão para docs - **Sidebars e navegação configurados**

#### ✅ Fase 2: Conteúdo Core (COMPLETO)
- [x] Getting Started Guide - **Guia de primeiros passos completo**
- [x] API Documentation - **Referência completa da API REST**
- [x] Component Library docs - **Arquitetura de componentes documentada**

#### ✅ Fase 3: Automação (COMPLETO)
- [x] Auto-generation de docs via CI - **Workflow deploy-docs.yml ativo**
- [x] Deploy automatizado - **GitHub Pages deployment configurado**
- [x] Search functionality - **Busca integrada do Docusaurus ativa**

### 🔗 Links Importantes

- **Site de Documentação:** https://pagecloudv1.github.io/xcloud-docs/
- **Repositório:** https://github.com/PageCloudv1/xcloud-docs
- **CI/CD Status:** [![Deploy](https://github.com/PageCloudv1/xcloud-docs/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/PageCloudv1/xcloud-docs/actions/workflows/deploy-docs.yml)

### 📋 Próximas Melhorias

- [ ] Adicionar mais exemplos práticos em cada guia
- [ ] Criar vídeos tutoriais para principais funcionalidades
- [ ] Expandir seção de troubleshooting
- [ ] Adicionar mais diagramas de arquitetura interativos
- [ ] Melhorar documentação de APIs de cada repositório do ecossistema

## 🎯 **Suporte**

- **Issues**: [GitHub Issues](https://github.com/PageCloudv1/xcloud-docs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/PageCloudv1/xcloud-docs/discussions)
- **Wiki**: [GitHub Wiki](https://github.com/PageCloudv1/xcloud-docs/wiki)

---

**🚀 Ready to contribute to the xCloud Platform!**

Para começar, escolha um dos guias de setup acima e siga as instruções passo a passo.
