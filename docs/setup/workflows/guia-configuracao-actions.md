# 🚀 GitHub Actions Configuration Guide - PageCloudv1 Organization

Este guia detalha a configuração completa dos GitHub Actions para a organização PageCloudv1 e todos os repositórios da xCloud Platform.

## 📋 Status Atual dos Workflows

### ✅ xcloud-platform (Repositório Principal)

- **🔍 CI/CD Pipeline** - Workflow de teste e verificação
- **🚀 Deploy to Production** - Workflow de deployment
- **Copilot** - Workflow automático do GitHub Copilot

### ❌ Repositórios sem Workflows (Precisam ser configurados)

- xcloud-cli
- xcloud-dashboard  
- xcloud-runtime
- xcloud-docs
- xcloud-templates
- xcloud-components
- xcloud-examples

## 🎯 Configurações Recomendadas para Organização

### 1. 🏢 Organization-Level Settings

**Acesse**: <https://github.com/organizations/PageCloudv1/settings/actions>

#### General Policies

```yaml
Actions permissions: 
  - ✅ Allow all actions and reusable workflows
  - ⚠️ Allow actions created by GitHub and verified creators
  - ❌ Allow select actions and reusable workflows

Fork pull request workflows:
  - ✅ Run workflows from fork pull requests
  - ✅ Send write tokens to workflows from fork pull requests  
  - ✅ Send secrets to workflows from fork pull requests

Workflow permissions:
  - ✅ Read and write permissions
  - ✅ Allow GitHub Actions to create and approve pull requests
```

#### Required Status Checks (Organization-wide)

```yaml
Required checks for all repositories:
  - "test" (CI/CD Pipeline)
  - "security" (Security scan)
  - "build" (Build verification)
```

### 2. 🔐 Organization Secrets

Configure estes secrets no nível da organização:

```bash
# Multi-Cloud Credentials
AWS_ACCESS_KEY_ID=***
AWS_SECRET_ACCESS_KEY=***
GCP_SERVICE_ACCOUNT_KEY=***
AZURE_CLIENT_ID=***
AZURE_CLIENT_SECRET=***
AZURE_TENANT_ID=***

# Container Registry
CONTAINER_REGISTRY_USERNAME=pagecloudv1
CONTAINER_REGISTRY_TOKEN=***
GHCR_TOKEN=*** # GitHub Container Registry

# PyPI Publishing
PYPI_API_TOKEN=***
TESTPYPI_API_TOKEN=***

# NPM Publishing  
NPM_TOKEN=***

# Deployment
PRODUCTION_DEPLOY_KEY=***
STAGING_DEPLOY_KEY=***

# Monitoring & Alerting
SLACK_WEBHOOK_URL=***
DISCORD_WEBHOOK_URL=***
DATADOG_API_KEY=***

# Security Scanning
SNYK_TOKEN=***
SONAR_TOKEN=***
```

### 3. 🌍 Environment Protection Rules

#### Production Environment

```yaml
Protection rules:
  - ✅ Required reviewers: 2 (from: @xcloud-core-team, @xcloud-devops-team)
  - ✅ Wait timer: 5 minutes
  - ✅ Restrict to protected branches: main
  - ✅ Prevent self-review

Environment secrets:
  - PRODUCTION_DATABASE_URL
  - PRODUCTION_API_KEYS
  - PRODUCTION_DOMAIN_CONFIG
```

#### Staging Environment

```yaml
Protection rules:
  - ✅ Required reviewers: 1 (from: @xcloud-core-team)
  - ❌ Wait timer: 0 minutes
  - ✅ Restrict to protected branches: main, develop

Environment secrets:
  - STAGING_DATABASE_URL
  - STAGING_API_KEYS
```

## 🛠️ Workflows por Repositório

### 🌟 xcloud-platform (Core Platform)

#### Workflow: CI/CD Pipeline

```yaml
# Status: ✅ Configurado (mas precisa melhorias)
# Melhorias necessárias:
- Adicionar Node.js matrix para dashboard
- Configurar cache para dependencies
- Adicionar security scanning com Trivy
- Configurar multi-arch builds
```

#### Workflow: Deploy to Production  

```yaml
# Status: ✅ Configurado (mas precisa melhorias)
# Melhorias necessárias:
- Adicionar deploy para multiple clouds
- Configurar blue-green deployment
- Adicionar rollback automático
- Notificações para Slack/Discord
```

#### Novo Workflow Necessário: Security & Compliance

```yaml
name: 🔒 Security & Compliance
triggers:
  - push to main/develop
  - pull requests
  - scheduled (daily)
jobs:
  - dependency-check
  - container-scan
  - secrets-scan
  - license-check
  - compliance-check
```

### ⚡ xcloud-cli

#### Workflow: CLI Testing & Publishing

```yaml
name: 🔧 CLI Build & Test
triggers:
  - push/PR to main
  - release published
jobs:
  test:
    - Python matrix: [3.9, 3.10, 3.11, 3.12]
    - OS matrix: [ubuntu, windows, macos]
    - Install + test CLI commands
    - Integration tests
  
  publish:
    - Build packages (wheel, source)
    - Publish to PyPI
    - Create GitHub release
    - Update Homebrew formula
```

### 🎨 xcloud-dashboard

#### Workflow: Frontend CI/CD

```yaml
name: 🎨 Dashboard CI/CD
triggers:
  - push/PR to main
  - path: dashboard/**
jobs:
  test:
    - Node.js matrix: [18, 20, 21]
    - npm install + test
    - ESLint + Prettier
    - TypeScript check
    - Unit tests (Jest)
    - E2E tests (Playwright)
    
  build:
    - Build production bundle
    - Optimize assets
    - Generate source maps
    - Deploy to CDN
```

### 🚀 xcloud-runtime

#### Workflow: Runtime Testing

```yaml
name: ⚡ Runtime Testing
triggers:
  - push/PR to main
  - path: runtime/**
jobs:
  test-runtimes:
    matrix:
      runtime: [python, nodejs, go]
      version: [multiple versions per runtime]
    steps:
      - Test runtime initialization
      - Test function execution
      - Performance benchmarks
      - Memory usage tests
```

### 📚 xcloud-docs

#### Workflow: Documentation Build

```yaml
name: 📚 Docs Build & Deploy
triggers:
  - push to main
  - path: docs/**
jobs:
  build:
    - Build with MkDocs/Sphinx
    - Generate API docs
    - Validate links
    - Deploy to GitHub Pages
    - Update search index
```

### 📦 xcloud-templates

#### Workflow: Template Testing

```yaml
name: 📦 Template Validation
triggers:
  - push/PR to main
  - path: templates/**
jobs:
  test-templates:
    matrix:
      template: [react, vue, nextjs, fastapi, express]
    steps:
      - Initialize template
      - Install dependencies  
      - Build project
      - Run tests
      - Verify deployment
```

### 🧩 xcloud-components

#### Workflow: Component Registry

```yaml
name: 🧩 Component Registry
triggers:
  - push to main
  - new component added
jobs:
  validate:
    - Component schema validation
    - Security scan
    - License check
    - Compatibility test
  
  publish:
    - Update component registry
    - Generate documentation
    - Publish to marketplace
```

### 🎯 xcloud-examples

#### Workflow: Example Projects Testing

```yaml
name: 🎯 Examples Testing
triggers:
  - push/PR to main
  - scheduled (weekly)
jobs:
  test-examples:
    matrix:
      example: [all example projects]
    steps:
      - Deploy example
      - Run integration tests
      - Performance checks
      - Cleanup resources
```

## 🔄 Reusable Workflows

Criar workflows reutilizáveis na organização:

### .github/workflows/reusable-python-test.yml

```yaml
name: Reusable Python Testing
on:
  workflow_call:
    inputs:
      python-version:
        required: false
        type: string
        default: '3.11'
      requirements-file:
        required: false
        type: string
        default: 'requirements.txt'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ inputs.python-version }}
      - name: Install dependencies
        run: pip install -r ${{ inputs.requirements-file }}
      - name: Run tests
        run: pytest tests/ -v --cov
```

### .github/workflows/reusable-node-test.yml

```yaml
name: Reusable Node.js Testing  
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '20'
      working-directory:
        required: false
        type: string
        default: '.'

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ${{ inputs.working-directory }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run lint
```

### .github/workflows/reusable-security-scan.yml

```yaml
name: Reusable Security Scanning
on:
  workflow_call:
    inputs:
      language:
        required: true
        type: string

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          languages: ${{ inputs.language }}
      
      - name: Container Scan
        if: contains(github.event.repository.files, 'Containerfile')
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'built-image:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy Results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'
```

## 📊 Monitoring & Analytics

### Self-Hosted Runners (Opcional)

Para builds intensivos ou específicos:

```yaml
# Runner configuration for xCloud platform
Runner groups:
  - xcloud-core: High-performance runners para xcloud-platform
  - xcloud-general: General purpose runners para outros repos

Runner types:
  - Standard: 2 CPU, 7GB RAM (free tier)
  - Large: 4 CPU, 16GB RAM (paid)
  - X-Large: 8 CPU, 32GB RAM (paid)
```

### Workflow Analytics

Configurar métricas para:

- Build success/failure rates
- Average build times
- Resource usage
- Security scan results
- Deployment frequency

## 🚨 Alerting & Notifications

### Slack Integration

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    channel: '#xcloud-ci-cd'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### Discord Integration  

```yaml
- name: Discord Notification
  uses: Ilshidur/action-discord@master
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  with:
    args: '🚀 xCloud deployment completed!'
```

## 📅 Implementation Timeline

### Phase 1 (Week 1): Core Setup

- [ ] Configure organization-level settings
- [ ] Setup organization secrets
- [ ] Create environment protection rules
- [ ] Improve existing workflows in xcloud-platform

### Phase 2 (Week 2): Repository Workflows

- [ ] Create CLI workflows (xcloud-cli)
- [ ] Create dashboard workflows (xcloud-dashboard)
- [ ] Create runtime workflows (xcloud-runtime)

### Phase 3 (Week 3): Supporting Workflows

- [ ] Create docs workflows (xcloud-docs)
- [ ] Create template workflows (xcloud-templates)
- [ ] Create component workflows (xcloud-components)
- [ ] Create examples workflows (xcloud-examples)

### Phase 4 (Week 4): Advanced Features

- [ ] Setup reusable workflows
- [ ] Configure self-hosted runners (if needed)
- [ ] Setup monitoring and alerting
- [ ] Performance optimization

## 🛠️ Manual Configuration Steps

1. **Organization Settings**
   - Go to <https://github.com/organizations/PageCloudv1/settings/actions>
   - Configure permissions and policies
   - Setup required status checks

2. **Secrets Management**
   - Add organization-level secrets
   - Configure environment-specific secrets
   - Setup environment protection rules

3. **Branch Protection**
   - Configure branch protection rules for each repo
   - Require status checks from workflows
   - Enable auto-merge for approved PRs

4. **Team Permissions**
   - Assign teams to environments
   - Configure review requirements
   - Setup approval workflows

## 🎯 Success Metrics

After implementation, monitor:

- **Build Success Rate**: >95%
- **Average Build Time**: &lt;10 minutos
- **Deployment Frequency**: Daily (staging), Weekly (production)
- **Security Scan Coverage**: 100% of PRs
- **Test Coverage**: >80% across all repositories

---

**📅 Created**: September 27, 2025  
**🔄 Version**: 1.0.0  
**👨‍💻 Maintainer**: xCloud DevOps Team
