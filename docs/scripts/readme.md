# 🔧 Scripts de Automação xCloud - Podman-Only

Esta pasta contém todos os scripts auxiliares do xCloud Platform. **Todos os scripts são JavaScript** para garantir compatibilidade multiplataforma (Windows/Linux/macOS) com **Podman exclusivamente**.

## 📋 Scripts Disponíveis

### **🔧 setup-github-secrets.js**

Configuração interativa de GitHub Secrets para todos os 8 repositórios do xCloud.

**Funcionalidades:**

- Configuração interativa via CLI
- Geração automática de JWT tokens
- Setup de webhooks
- Validação de secrets existentes
- Modo dry-run para teste
- **Container registry secrets**: Para publicação via Podman

**Uso:**

```bash
node scripts/setup-github-secrets.js
node scripts/setup-github-secrets.js --dry-run  # Modo teste
```

**Pré-requisitos:**

- GitHub CLI autenticado (`gh auth login`)
- Node.js 18+

### **🏔️ configure-podman.js**

Setup automático do Podman com Alpine Linux para uso mínimo de recursos.

**Funcionalidades:**

- Download de imagens Alpine otimizadas
- Configuração de limites de recursos (256MB RAM, 0.5 CPU)
- Setup do ambiente de testes com Act
- Validação de pré-requisitos
- Configuração rootless para segurança

**Uso:**

```bash
node scripts/configure-podman.js
```

**Pré-requisitos:**

- Podman Desktop instalado
- Conexão com internet para download das imagens

**Imagens Alpine configuradas:**

- `alpine:latest` (~5MB)
- `node:18-alpine`, `node:20-alpine` (~40MB)
- `python:3.9-alpine`, `python:3.10-alpine`, `python:3.11-alpine` (~25-29MB)
- `golang:1.21-alpine` (~35MB)

### **🔍 check-prerequisites.js**

Verificação rápida de pré-requisitos do sistema.

**Funcionalidades:**

- Verifica Node.js, **Podman**, Act, GitHub CLI
- Output colorizado e informativo
- Sugestões de instalação quando necessário

**Uso:**

```bash
node scripts/check-prerequisites.js
```

### **📊 project-status.js**

Status completo da estrutura do projeto xCloud.

**Funcionalidades:**

- Verifica estrutura de diretórios
- Lista scripts e testes disponíveis
- Mostra status de pré-requisitos (Podman)
- Interface visual com cores e emojis
- Relatório de uso de recursos Podman

**Uso:**

```bash
node scripts/project-status.js
```

## 🏔️ **Estratégia Podman-Only**

### **🔧 Desenvolvimento Local**

- **Podman** - Runtime único para desenvolvimento
- **Alpine Linux** - Base de todas as imagens
- **Rootless containers** - Segurança por padrão
- **Limites de recursos** - 256MB RAM, 0.5 CPU cores

### **📦 Publicação**

- **Container Registries** - GHCR, outros registries via Podman
- **Multi-arch** - ARM64 + AMD64
- **Alpine-based** - Imagens otimizadas

### **🧪 Testing**

- **Act + Podman** - Teste local de GitHub Actions
- **Alpine containers** - Ambiente de teste leve
- **Resource constraints** - Limites realísticos

## 🎨 Padrões de Desenvolvimento

### **JavaScript-Only Policy**

- **Todos os scripts auxiliares devem ser JavaScript**
- **Runtime**: Node.js (18+)
- **CLI Framework**: Commander.js para interfaces interativas
- **Compatibilidade**: Windows PowerShell, Linux/macOS bash

### **Estrutura Padrão**

```javascript
#!/usr/bin/env node

/**
 * Script description
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    info: '\x1b[36m',
    reset: '\x1b[0m'
};

function colorLog(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
    // Script logic here - Podman commands only
    try {
        execSync('podman --version', { stdio: 'pipe' });
        colorLog('✅ Podman encontrado', 'success');
    } catch (error) {
        colorLog('❌ Podman necessário para desenvolvimento', 'error');
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };
```

### **Container Commands**

```javascript
// Podman commands - única opção
execSync('podman build -t app .', { stdio: 'inherit' });
execSync('podman run -d -p 8000:8000 app', { stdio: 'inherit' });
execSync('podman-compose up -d', { stdio: 'inherit' });
execSync('podman push registry.example.com/app', { stdio: 'inherit' });
```

## 🚀 Integração com VS Code

Todos os scripts estão integrados como **Tasks** no VS Code:

### **Tasks Disponíveis:**

- `🔧 Setup GitHub Secrets` - Configuração de secrets
- `🏔️ Configure Podman (Alpine + Minimal Resources)` - Setup do Podman
- `🔍 Check Prerequisites` - Verificação de pré-requisitos (Podman)
- `📊 Project Status` - Status do projeto com métricas Podman

### **Como Usar:**

1. `Ctrl+Shift+P` → `Tasks: Run Task`
2. Selecione a task desejada
3. Acompanhe o progresso no terminal integrado

## 🔒 Segurança

### **Container Security**

- **Rootless Podman** - Sem necessidade de sudo
- **Alpine Linux** - Menor superfície de ataque
- **Resource limits** - Prevenção de resource exhaustion
- **No privileged containers** - Segurança por padrão

### **Secrets Management**

- **Container registry secrets** - Apenas para publicação de imagens
- **GitHub CLI** - Para autenticação local
- **Environment variables** - Nunca hardcoded nos scripts

## 📚 Dependências

### **Runtime Requirements:**

- **Node.js**: 18.0.0 ou superior
- **Podman**: 4.0+ (único runtime suportado)

### **External Tools:**

- **Podman Desktop**: Para desenvolvimento local
- **Act**: Para testes locais de GitHub Actions (configurado para Podman)
- **GitHub CLI**: Para integração com GitHub

## 🤝 Contribuindo

### **Novos Scripts:**

1. Siga a estrutura padrão JavaScript
2. Use apenas comandos Podman
3. Inclua documentação inline
4. Adicione ao `.vscode/tasks.json` se apropriado
5. Atualize esta documentação

### **Melhorias:**

1. Mantenha compatibilidade multiplataforma
2. Use recursos visuais (cores/emojis)
3. Inclua tratamento de erro robusto
4. Teste exclusivamente com Podman + Alpine Linux
5. Documente estratégia container

## 💡 Comandos Podman Essenciais

### **Para Desenvolvedores:**

```bash
# Container management
podman build -t app .
podman run -d -p 8000:8000 app
podman ps
podman logs <container-id>
podman stop <container-id>

# Image management  
podman images
podman rmi <image-id>
podman pull alpine:latest

# Compose management
podman-compose up -d
podman-compose down
podman-compose logs
```

### **Para CI/CD:**

- **Local testing**: Act + Podman
- **GitHub Actions**: Podman em runners
- **Publishing**: Container registries via Podman push

---

**🌩️ xCloud Scripts**: Automação Podman-only, Alpine Linux, e DevOps eficiente!
