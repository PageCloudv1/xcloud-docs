# 🚀 **GitHub Secrets Setup - Quick Start Guide**

## 📋 **Overview**

Este guia irá configurar todos os **GitHub Secrets** necessários para a **PageCloudv1 Organization**, ativando automações completas da xCloud Platform.

## 🎯 **What Will Be Configured**

### **Organization-Level Secrets:**
- 🤖 **AI Automation**: GEMINI_API_KEY para reviews inteligentes
- 📦 **Package Publishing**: NPM_TOKEN, GHCR_TOKEN
- 🚀 **Deployments**: NETLIFY_AUTH_TOKEN, Container Registry tokens
- 🔒 **Security**: CODECOV_TOKEN, SONARCLOUD_TOKEN, SNYK_TOKEN

### **Repository-Specific Secrets:**
- **xcloud-platform**: Database, Redis, JWT, Webhook secrets
- **xcloud-dashboard**: API URLs, analytics, error tracking
- **xcloud-runtime**: Package publishing tokens

## ⚡ **Quick Setup (Recommended)**

### **Option 1: Windows PowerShell (Interactive)**

```powershell
# 1. Authenticate GitHub CLI with organization permissions
gh auth login --scopes admin:org

# 2. Run interactive setup script
.\setup-github-secrets.ps1 -Mode interactive

# 3. Follow prompts to enter your secret values
```

### **Option 2: Cross-Platform Node.js (Interactive)**

```bash
# 1. Authenticate GitHub CLI with organization permissions
gh auth login --scopes admin:org

# 2. Run interactive setup script (works on all platforms)
node docs/scripts/setup-github-secrets.js

# 3. Follow prompts to enter your secret values
```

### **Option 3: Dry Run (Test Mode)**

```bash
# Cross-platform - Test without setting actual secrets
node docs/scripts/setup-github-secrets.js --dry-run

# PowerShell alternative (Windows only)
.\docs\scripts\setup-github-secrets.ps1 -DryRun
```

## 📝 **Manual Setup (Alternative)**

Se preferir configurar manualmente, use os comandos individuais:

### **Critical Secrets First:**

```bash
# Gemini AI API Key (Critical)
gh secret set GEMINI_API_KEY --org PageCloudv1 --visibility all

# NPM Token (Critical)  
gh secret set NPM_TOKEN --org PageCloudv1 --visibility all

# GitHub Container Registry Token (Critical)
gh secret set GHCR_TOKEN --org PageCloudv1 --visibility all
```

### **Deployment Secrets:**

```bash
# Netlify Authentication
gh secret set NETLIFY_AUTH_TOKEN --org PageCloudv1 --visibility all

# Container Registry Credentials
gh secret set CONTAINER_REGISTRY_USERNAME --org PageCloudv1 --visibility all
gh secret set CONTAINER_REGISTRY_TOKEN --org PageCloudv1 --visibility all
```

### **Repository-Specific:**

```bash
# xcloud-platform secrets
gh secret set DATABASE_URL --repo PageCloudv1/xcloud-platform
gh secret set REDIS_URL --repo PageCloudv1/xcloud-platform
gh secret set JWT_SECRET --repo PageCloudv1/xcloud-platform
gh secret set WEBHOOK_SECRET --repo PageCloudv1/xcloud-platform

# xcloud-dashboard secrets
gh secret set REACT_APP_API_BASE_URL --repo PageCloudv1/xcloud-dashboard
```

## 🔑 **Where to Get Secret Values**

### **🤖 AI & Automation**
- **GEMINI_API_KEY**: <https://aistudio.google.com/app/apikey>

### **📦 Package Management**
- **NPM_TOKEN**: `npm adduser && npm token create`
- **GHCR_TOKEN**: GitHub Settings → Developer settings → Personal access tokens

### **🚀 Deployment & Hosting**
- **NETLIFY_AUTH_TOKEN**: Netlify Dashboard → User Settings → Applications
- **NETLIFY_SITE_ID**: Netlify site settings → Site details → Site ID

### **🔧 Container Registry**
- **CONTAINER_REGISTRY_TOKEN**: GitHub Container Registry → Settings → Developer settings → Personal access tokens

### **🔒 Security & Code Quality**
- **CODECOV_TOKEN**: codecov.io → Repository settings → Upload token
- **SONARCLOUD_TOKEN**: SonarCloud → Account → Security → Generate token
- **SNYK_TOKEN**: Snyk Dashboard → Settings → General → Auth Token

## ✅ **Verification**

Após a configuração, verifique se os secrets foram configurados:

```bash
# Listar secrets da organização
gh secret list --org PageCloudv1

# Listar secrets de repositórios específicos
gh secret list --repo PageCloudv1/xcloud-platform
gh secret list --repo PageCloudv1/xcloud-dashboard
gh secret list --repo PageCloudv1/xcloud-runtime
```

## 🎯 **Expected Output**

Você deve ver algo como:

```text
Organization Secrets: 8/8 configured ✅
Repository Secrets: 6/6 configured ✅

🎉 All secrets configured successfully!
Your xCloud Platform is now ready for full automation!
```

## 🚀 **What Happens Next**

Após configurar os secrets, as seguintes automações estarão ativas:

### **✅ Immediately Active:**
- **Gemini AI Reviews**: PRs automáticos com análise inteligente
- **Container Publishing**: Imagens Podman automáticas
- **Package Publishing**: NPM packages automáticos
- **Security Scanning**: Análise de vulnerabilidades automática

### **✅ Ready for Deployment:**
- **Automated Deployments**: Deploy automático no Netlify
- **Test Coverage**: Cobertura de testes automática
- **Code Quality**: Relatórios de qualidade automáticos

## 🔧 **Troubleshooting**

### **Permission Issues:**
```bash
# Ensure you have admin:org scope
gh auth refresh --scopes admin:org
```

### **Organization Access:**
```bash  
# Verify organization access
gh api orgs/PageCloudv1
```

### **Manual Secret Setting:**
```bash
# Set individual secret manually
echo "your_secret_value" | gh secret set SECRET_NAME --org PageCloudv1 --visibility all
```

## 📚 **Additional Resources**

- **GitHub Secrets Documentation**: <https://docs.github.com/en/actions/security-guides/encrypted-secrets>
- **GitHub CLI Manual**: <https://cli.github.com/manual/gh_secret>
- **xCloud Architecture**: [arquitetura.md](../../architecture/arquitetura.md)
- **Contributing Guide**: [como-contribuir.md](../development/como-contribuir.md)

---

## 🎯 **Ready to Go!**

Escolha uma das opções acima e em poucos minutos sua xCloud Platform estará completamente configurada com todas as automações ativas! 🚀

**Recommended**: Use o script interativo para uma configuração guiada e segura.