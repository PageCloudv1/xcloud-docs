# 🔄 Padrão de Workflows GitHub Actions - xCloud

Este documento define o padrão de workflows GitHub Actions para todos os projetos da plataforma xCloud, baseado na implementação de referência do `xcloud-bot`.

## 📋 Visão Geral

Todos os projetos xCloud devem implementar os seguintes workflows padronizados:

| Workflow | Arquivo | Propósito | Trigger Principal |
|----------|---------|-----------|-------------------|
| **CI** | `ci.yml` | Integração Contínua | Push/PR para main/develop |
| **CD** | `cd.yml` | Entrega Contínua | Após CI bem-sucedido |
| **Main** | `main.yml` | Coordenação Principal | Push/PR/Schedule |
| **Build** | `build.yml` | Build Específico | Mudanças em src/ |
| **Test** | `test.yml` | Testes Detalhados | Mudanças em testes |
| **Deploy** | `deploy.yml` | Deploy Específico | Workflow manual/call |

## 🎯 Estrutura Padrão

### 📁 Estrutura de Diretório
```
.github/
└── workflows/
    ├── ci.yml          # 🔄 Integração Contínua
    ├── cd.yml          # 🚀 Entrega Contínua  
    ├── main.yml        # 🎯 Workflow Principal
    ├── build.yml       # 🏗️ Build Específico
    ├── test.yml        # 🧪 Testes Detalhados
    └── deploy.yml      # 🚀 Deploy Específico
```

## 🔄 Workflow: CI (Integração Contínua)

**Arquivo:** `.github/workflows/ci.yml`

### Propósito
- Executar verificações de qualidade de código
- Realizar build do projeto
- Executar testes básicos
- Gerar artefatos de build

### Triggers
- Push para `main` e `develop`
- Pull Request para `main` e `develop`
- Execução manual (`workflow_dispatch`)

### Jobs Principais
1. **🧪 Quality Checks** - Lint, formatação, auditoria
2. **🏗️ Build** - Build do projeto e upload de artefatos
3. **🧪 Test** - Execução de testes e cobertura

### Variáveis de Ambiente
- `NODE_VERSION: '20'` - Versão padrão do Node.js

### Exemplos de Uso
```yaml
# Trigger automático em push
git push origin main

# Execução manual no GitHub
# Actions → CI → Run workflow
```

## 🚀 Workflow: CD (Entrega Contínua)

**Arquivo:** `.github/workflows/cd.yml`

### Propósito
- Deploy automático após CI bem-sucedido
- Gerenciamento de ambientes (staging/production)
- Notificações de deploy

### Triggers
- Conclusão bem-sucedida do workflow CI
- Execução manual com seleção de ambiente

### Jobs Principais
1. **🔍 Check CI Status** - Verificação do status do CI
2. **🌱 Deploy to Staging** - Deploy para ambiente de staging
3. **🏭 Deploy to Production** - Deploy para produção (manual)
4. **📢 Notify** - Notificações de resultado

### Ambientes Suportados
- `staging` - Deploy automático
- `production` - Deploy manual apenas

## 🎯 Workflow: Main (Principal)

**Arquivo:** `.github/workflows/main.yml`

### Propósito
- Coordenar execução de outros workflows
- Health checks programados
- Orquestração centralizada

### Triggers
- Push para `main` e `develop`
- Pull Request para `main`
- Agendamento diário (02:00 UTC)
- Execução manual com opções

### Jobs Principais
1. **🔧 Setup** - Configuração de execução
2. **🔄 Call CI/Test/Build/Deploy** - Chamada de workflows
3. **🏥 Health Check** - Verificações de saúde (agendado)
4. **📊 Summary** - Resumo de execução

### Inputs Manuais
- `run_tests` - Executar testes (default: true)
- `run_build` - Executar build (default: true)
- `run_deploy` - Executar deploy (default: false)

## 🏗️ Workflow: Build

**Arquivo:** `.github/workflows/build.yml`

### Propósito
- Build otimizado e reutilizável
- Análise de artefatos de build
- Build de documentação

### Triggers
- Chamada de outros workflows (`workflow_call`)
- Push em arquivos relacionados ao build
- Execução manual

### Jobs Principais
1. **🔧 Prepare Build** - Preparação e cache
2. **🏗️ Build Project** - Build principal
3. **📚 Build Documentation** - Build da documentação

### Inputs Aceitos
- `node-version` - Versão do Node.js (default: '20')
- `build-command` - Comando de build (default: 'npm run build')
- `artifact-name` - Nome do artefato (default: 'build-artifacts')

### Outputs Gerados
- `build-status` - Status do build
- Artefatos de build uploadados

## 🧪 Workflow: Test

**Arquivo:** `.github/workflows/test.yml`

### Propósito
- Execução completa de testes
- Testes unitários, integração e E2E
- Relatórios de cobertura

### Triggers
- Chamada de outros workflows (`workflow_call`)
- Push em arquivos de teste
- Pull Request
- Execução manual

### Jobs Principais
1. **🔧 Setup** - Configuração de tipos de teste
2. **🔬 Unit Tests** - Testes unitários
3. **🔗 Integration Tests** - Testes de integração
4. **🎭 E2E Tests** - Testes end-to-end
5. **🧪 Test Summary** - Resumo e cobertura

### Tipos de Teste
- `unit` - Apenas testes unitários
- `integration` - Apenas testes de integração
- `e2e` - Apenas testes E2E
- `all` - Todos os tipos (default)

### Serviços Incluídos
- PostgreSQL 15 para testes de integração
- Playwright para testes E2E

## 🚀 Workflow: Deploy

**Arquivo:** `.github/workflows/deploy.yml`

### Propósito
- Deploy específico para ambientes
- Verificações pré e pós-deploy  
- Rollback automático em falhas

### Triggers
- Chamada de outros workflows (`workflow_call`)
- Execução manual com seleção de ambiente

### Jobs Principais
1. **🔍 Pre-Deploy Checks** - Verificações de segurança
2. **🚀 Deploy** - Deploy para ambiente específico
3. **💨 Smoke Tests** - Testes básicos pós-deploy
4. **📢 Notify** - Notificações de resultado
5. **🔄 Rollback** - Rollback em caso de falha

### Inputs Obrigatórios
- `environment` - Ambiente de deploy (staging/production)

### Outputs Gerados
- `deployment-url` - URL do deploy
- `deployment-status` - Status do deploy

## 🏷️ Sistema de Labels (Emojis)

### Padrão de Nomes e Emojis

| Categoria | Emoji | Exemplo |
|-----------|-------|---------|
| **CI/CD** | 🔄 | `🔄 CI - Continuous Integration` |
| **Deploy** | 🚀 | `🚀 Deploy to Production` |
| **Build** | 🏗️ | `🏗️ Build Project` |
| **Test** | 🧪 | `🧪 Run Tests` |
| **Setup** | 🔧 | `🔧 Setup Environment` |
| **Check** | 🔍 | `🔍 Pre-Deploy Checks` |
| **Security** | 🛡️ | `🛡️ Security Audit` |
| **Notification** | 📢 | `📢 Send Notification` |
| **Health** | 🏥 | `🏥 Health Check` |
| **Summary** | 📊 | `📊 Generate Summary` |

### Jobs por Categoria

#### 🔧 Setup & Prepare
```yaml
name: 🔧 Setup Environment
name: 🔧 Prepare Build  
name: 🔧 Configure Deployment
```

#### 🔍 Checks & Validation
```yaml
name: 🔍 Quality Checks
name: 🔍 Pre-Deploy Checks
name: 🔍 Security Checks
```

#### 🏗️ Build & Compile
```yaml
name: 🏗️ Build Project
name: 🏗️ Build Documentation
name: 🏗️ Build for Production
```

#### 🧪 Testing
```yaml
name: 🧪 Unit Tests
name: 🧪 Integration Tests  
name: 🧪 Test Summary
name: 🔬 Unit Tests        # Testes unitários específicos
name: 🔗 Integration Tests # Testes de integração
name: 🎭 E2E Tests        # Testes end-to-end
```

#### 🚀 Deploy & Release
```yaml
name: 🚀 Deploy to Staging
name: 🚀 Deploy to Production
name: 🚀 Deploy Application
```

#### 📊 Reports & Analytics
```yaml
name: 📊 Generate Coverage Report
name: 📊 Build Analysis
name: 📊 Workflow Summary
```

#### 📢 Communication
```yaml
name: 📢 Send Notification
name: 📢 Notify Deployment
name: 📢 Post Results
```

## ⚙️ Configurações Padrão

### Variáveis de Ambiente Globais
```yaml
env:
  NODE_VERSION: '20'           # Versão padrão do Node.js
  CI: true                     # Flag de ambiente CI
  DEPLOY_TIMEOUT: '300'        # Timeout de deploy (5min)
```

### Matriz de Compatibilidade
```yaml
strategy:
  matrix:
    node-version: [18, 20, 21]
    os: [ubuntu-latest]
```

### Artefatos Padrão
- **Retenção:** 7 dias para builds, 3 dias para testes
- **Nomes:** `build-artifacts`, `test-results`, `coverage-reports`

### Ambientes Suportados
- **staging** - Deploy automático, validação contínua
- **production** - Deploy manual, aprovação necessária

## 🔒 Requisitos de Segurança

### Secrets Necessários
```yaml
# Para deploy em produção
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DEPLOY_TOKEN

# Para notificações  
SLACK_WEBHOOK_URL
DISCORD_WEBHOOK_URL
```

### Permissões Mínimas
```yaml
permissions:
  contents: read        # Ler código
  actions: read         # Ler workflows
  checks: write         # Escrever checks
  pull-requests: write  # Comentar em PRs
```

## 📝 Scripts package.json Esperados

### Scripts Básicos
```json
{
  "scripts": {
    "build": "...",
    "build:staging": "...", 
    "build:production": "...",
    "test": "...",
    "test:unit": "...",
    "test:integration": "...",
    "test:e2e": "...",
    "test:coverage": "...",
    "lint": "...",
    "format:check": "...",
    "deploy": "...",
    "docs:build": "..."
  }
}
```

## 🎯 Implementação em Novos Projetos

### 1. Copiar Workflows
```bash
# No novo projeto
mkdir -p .github/workflows
cp xcloud-bot/.github/workflows/* .github/workflows/
```

### 2. Personalizar Configurações
- Ajustar nomes dos workflows
- Configurar ambientes específicos
- Ajustar comandos de build/test/deploy

### 3. Configurar Secrets
- Adicionar secrets necessários no repositório
- Configurar environments no GitHub

### 4. Testar Workflows
```bash
# Testar sintaxe localmente
act --list
act -j build --dry-run
```

## 🔍 Monitoramento e Métricas

### Métricas Coletadas
- ⏱️ Tempo de execução de workflows
- ✅ Taxa de sucesso por workflow
- 📊 Cobertura de testes
- 🔒 Issues de segurança detectados

### Dashboards Sugeridos
- Status geral de CI/CD
- Tempo médio de deploy
- Taxa de rollback
- Cobertura de testes por projeto

## 🆘 Troubleshooting

### Problemas Comuns

#### ❌ Workflow não executa
```yaml
# Verificar triggers
on:
  push:
    branches: [main]  # Branch correto?
```

#### ❌ Build falha
```bash
# Verificar Node.js version
node-version: ${{ env.NODE_VERSION }}

# Verificar scripts package.json
npm run build
```

#### ❌ Deploy falha
```yaml
# Verificar secrets
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
```

### Debug Mode
```yaml
# Adicionar para debug
- name: 🐛 Debug Info
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "Working directory: $(pwd)"
    ls -la
```

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [xCloud Bot - Implementação de Referência](../../../xcloud-bot/.github/workflows/)

---

**📍 Nota:** Este padrão é versionado e deve ser seguido por todos os projetos xCloud. Para alterações, abra um PR no repositório `xcloud-docs`.