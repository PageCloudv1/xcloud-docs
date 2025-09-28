# 🔐 GitHub Secrets Configuration Guide

## 📋 **Secrets Overview**

Configuração completa de secrets necessários para a **PageCloudv1 Organization** para ativar todas as automações e deployments da xCloud Platform.

## 🏢 **Organization-Level Secrets**

### **🤖 AI & Automation**
```bash
GEMINI_API_KEY
# Descrição: Chave API do Google Gemini AI para automações inteligentes
# Usado em: PR reviews automáticos, issue triage, análise de código
# Repositórios: Todos (organization-level)
# Como obter: https://aistudio.google.com/app/apikey
```

### **📦 Package Management**
```bash
NPM_TOKEN
# Descrição: Token NPM para publicar pacotes @xcloud/*
# Usado em: xcloud-components, xcloud-examples (Node.js packages)
# Escopo: read:packages, write:packages
# Como obter: npm adduser -> npm token create
```

### **🚀 Deployment & Hosting**
```bash
NETLIFY_AUTH_TOKEN
# Descrição: Token Netlify para deploy automático
# Usado em: xcloud-dashboard, xcloud-docs
# Como obter: Netlify Dashboard -> User Settings -> Applications -> Personal access tokens

NETLIFY_SITE_ID_DASHBOARD
# Descrição: Site ID do dashboard no Netlify
# Usado em: xcloud-dashboard deployment
# Como obter: Netlify site settings -> Site details -> Site ID

NETLIFY_SITE_ID_DOCS
# Descrição: Site ID da documentação no Netlify
# Usado em: xcloud-docs deployment
# Como obter: Netlify site settings -> Site details -> Site ID
```

### **🔧 Container Registry**
```bash
CONTAINER_REGISTRY_USERNAME
# Descrição: Username Container Registry para publicar imagens
# Usado em: xcloud-platform, xcloud-runtime containers
# Como obter: GitHub Container Registry settings

CONTAINER_REGISTRY_TOKEN
# Descrição: Access token Container Registry
# Usado em: Push de imagens Podman
# Como obter: GitHub -> Settings -> Developer settings -> Personal access tokens

GHCR_TOKEN
# Descrição: GitHub Container Registry token
# Usado em: Publicar imagens no ghcr.io
# Escopo: write:packages, read:packages
# Como obter: GitHub Settings -> Developer settings -> Personal access tokens
```

### **☁️ Cloud Providers**
```bash
AWS_ACCESS_KEY_ID
# Descrição: AWS Access Key para deployments
# Usado em: xcloud-platform (AWS Lambda, ECS)
# Como obter: AWS IAM -> Users -> Security credentials

AWS_SECRET_ACCESS_KEY
# Descrição: AWS Secret Access Key
# Usado em: xcloud-platform AWS deployments
# Como obter: AWS IAM -> Users -> Security credentials

GCP_SERVICE_ACCOUNT_KEY
# Descrição: Google Cloud service account JSON key
# Usado em: xcloud-platform (Cloud Run, GKE)
# Como obter: GCP Console -> IAM -> Service Accounts -> Create key

AZURE_CREDENTIALS
# Descrição: Azure service principal credentials (JSON)
# Usado em: xcloud-platform (Azure Container Instances)
# Como obter: Azure CLI -> az ad sp create-for-rbac
```

### **🔒 Security & Code Quality**
```bash
CODECOV_TOKEN
# Descrição: Token Codecov para relatórios de cobertura
# Usado em: Todos os repositórios com testes
# Como obter: codecov.io -> Repository settings -> Upload token

SONARCLOUD_TOKEN
# Descrição: Token SonarCloud para análise de qualidade
# Usado em: xcloud-platform, xcloud-cli (análise de código)
# Como obter: SonarCloud -> Account -> Security -> Generate token

SNYK_TOKEN
# Descrição: Token Snyk para scan de vulnerabilidades
# Usado em: Todos os repositórios (dependency scanning)
# Como obter: Snyk Dashboard -> Settings -> General -> Auth Token
```

## 📊 **Repository-Specific Secrets**

### **xcloud-platform**
```bash
DATABASE_URL                 # PostgreSQL connection string
REDIS_URL                   # Redis connection string
JWT_SECRET                  # JWT signing secret
WEBHOOK_SECRET             # GitHub webhook secret
```

### **xcloud-dashboard**
```bash
REACT_APP_API_BASE_URL     # xCloud API base URL
REACT_APP_SENTRY_DSN       # Sentry error tracking
REACT_APP_ANALYTICS_ID     # Google Analytics ID
```

### **xcloud-runtime**
```bash
PYTHON_PACKAGE_TOKEN       # PyPI publishing token  
GO_PROXY_AUTH             # Go module proxy auth
NODE_AUTH_TOKEN           # NPM registry auth
```

## 🚀 **Setup Commands**

### **1. Organization Secrets (Admin Required)**

```bash
# Via GitHub CLI (recomendado)
gh auth login --scopes admin:org

# AI & Automation
gh secret set GEMINI_API_KEY --org PageCloudv1 --visibility all --body "$(cat gemini-api-key.txt)"

# Package Management  
gh secret set NPM_TOKEN --org PageCloudv1 --visibility all --body "$(cat npm-token.txt)"

# Deployment
gh secret set NETLIFY_AUTH_TOKEN --org PageCloudv1 --visibility all --body "$(cat netlify-token.txt)"
gh secret set NETLIFY_SITE_ID_DASHBOARD --org PageCloudv1 --visibility selected --repos "xcloud-dashboard" --body "$(cat netlify-dashboard-id.txt)"
gh secret set NETLIFY_SITE_ID_DOCS --org PageCloudv1 --visibility selected --repos "xcloud-docs" --body "$(cat netlify-docs-id.txt)"

# Container Registry
gh secret set CONTAINER_REGISTRY_USERNAME --org PageCloudv1 --visibility all --body "pagecloud-bot"
gh secret set CONTAINER_REGISTRY_TOKEN --org PageCloudv1 --visibility all --body "$(cat container-registry-token.txt)"
gh secret set GHCR_TOKEN --org PageCloudv1 --visibility all --body "$(cat ghcr-token.txt)"

# Cloud Providers
gh secret set AWS_ACCESS_KEY_ID --org PageCloudv1 --visibility selected --repos "xcloud-platform" --body "$(cat aws-key-id.txt)"
gh secret set AWS_SECRET_ACCESS_KEY --org PageCloudv1 --visibility selected --repos "xcloud-platform" --body "$(cat aws-secret.txt)"
gh secret set GCP_SERVICE_ACCOUNT_KEY --org PageCloudv1 --visibility selected --repos "xcloud-platform" --body "$(cat gcp-key.json)"
gh secret set AZURE_CREDENTIALS --org PageCloudv1 --visibility selected --repos "xcloud-platform" --body "$(cat azure-creds.json)"

# Security & Quality
gh secret set CODECOV_TOKEN --org PageCloudv1 --visibility all --body "$(cat codecov-token.txt)"
gh secret set SONARCLOUD_TOKEN --org PageCloudv1 --visibility selected --repos "xcloud-platform,xcloud-cli" --body "$(cat sonar-token.txt)"
gh secret set SNYK_TOKEN --org PageCloudv1 --visibility all --body "$(cat snyk-token.txt)"
```

### **2. Repository-Specific Secrets**

```bash
# xcloud-platform
gh secret set DATABASE_URL --repo PageCloudv1/xcloud-platform --body "postgresql://user:pass@host:5432/xcloud"
gh secret set REDIS_URL --repo PageCloudv1/xcloud-platform --body "redis://host:6379"
gh secret set JWT_SECRET --repo PageCloudv1/xcloud-platform --body "$(openssl rand -base64 32)"
gh secret set WEBHOOK_SECRET --repo PageCloudv1/xcloud-platform --body "$(openssl rand -hex 20)"

# xcloud-dashboard  
gh secret set REACT_APP_API_BASE_URL --repo PageCloudv1/xcloud-dashboard --body "https://api.xcloud.dev"
gh secret set REACT_APP_SENTRY_DSN --repo PageCloudv1/xcloud-dashboard --body "$(cat sentry-dsn.txt)"
gh secret set REACT_APP_ANALYTICS_ID --repo PageCloudv1/xcloud-dashboard --body "G-XXXXXXXXXX"

# xcloud-runtime
gh secret set PYTHON_PACKAGE_TOKEN --repo PageCloudv1/xcloud-runtime --body "$(cat pypi-token.txt)"
gh secret set GO_PROXY_AUTH --repo PageCloudv1/xcloud-runtime --body "$(cat go-proxy-auth.txt)"
gh secret set NODE_AUTH_TOKEN --repo PageCloudv1/xcloud-runtime --body "$(cat npm-auth-token.txt)"
```

## 🔍 **Verification Commands**

```bash
# Listar secrets da organização
gh secret list --org PageCloudv1

# Listar secrets de um repositório específico
gh secret list --repo PageCloudv1/xcloud-platform

# Verificar se secret existe
gh secret list --org PageCloudv1 | grep GEMINI_API_KEY
```

## 🎯 **Priority Setup Order**

### **🚨 Critical (Setup First)**
1. **GEMINI_API_KEY** - Necessário para automações AI
2. **GHCR_TOKEN** - Para container registry
3. **NPM_TOKEN** - Para publicar pacotes

### **⚡ High Priority**
4. **NETLIFY_AUTH_TOKEN** + Site IDs - Para deployments
5. **CONTAINER_REGISTRY_TOKEN** - Para imagens Podman
6. **CODECOV_TOKEN** - Para cobertura de testes

### **🔧 Medium Priority**
7. **Cloud Provider Secrets** (AWS, GCP, Azure)
8. **Security Tokens** (SONARCLOUD, SNYK)
9. **Repository-specific secrets**

## 📚 **Documentation Links**

- **GitHub Secrets**: <https://docs.github.com/en/actions/security-guides/encrypted-secrets>
- **GitHub CLI Secrets**: <https://cli.github.com/manual/gh_secret>
- **Organization Secrets**: <https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization>

## ⚠️ **Security Best Practices**

1. **Principle of Least Privilege**: Secrets apenas para repositórios que precisam
2. **Regular Rotation**: Rotacionar tokens periodicamente (90 dias)
3. **Monitoring**: Monitorar uso de secrets nos workflows
4. **Backup**: Manter backup seguro dos tokens (vault)
5. **Audit**: Revisar permissões de secrets mensalmente

## 🚀 **Automation Ready**

Uma vez configurados os secrets, as seguintes automações estarão ativas:

- ✅ **Gemini AI Reviews** - PRs automáticos com análise inteligente
- ✅ **Automated Deployments** - Deploy automático no Netlify
- ✅ **Container Publishing** - Imagens Podman automáticas
- ✅ **Package Publishing** - NPM packages automáticos
- ✅ **Security Scanning** - Análise de vulnerabilidades
- ✅ **Code Quality** - Relatórios de qualidade automáticos
- ✅ **Test Coverage** - Cobertura de testes automática

---

**⚡ Quick Start**: Execute os comandos na seção "Setup Commands" para configurar todos os secrets automaticamente!