# 🛠️ xCloud CLI - Guia Completo

A xCloud CLI é o coração da plataforma xCloud. Este guia abrangente cobre todos os comandos, opções e casos de uso para maximizar sua produtividade no desenvolvimento e deploy de aplicações.

## 📑 Índice

- [Instalação e Configuração](#-instalação-e-configuração)
- [Autenticação](#-autenticação)
- [Comandos de Projeto](#-comandos-de-projeto)
- [Deploy e Ambientes](#-deploy-e-ambientes)
- [Gerenciamento de Domínios](#-gerenciamento-de-domínios)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Logs e Monitoramento](#-logs-e-monitoramento)
- [Templates e Componentes](#-templates-e-componentes)
- [Funções Serverless](#-funções-serverless)
- [Configuração Avançada](#-configuração-avançada)

## 🔧 Instalação e Configuração

### Instalação

```bash
# Via npm (método preferido)
npm install -g xcloud-cli

# Via Homebrew (macOS/Linux)
brew install xcloud-cli

# Via cURL (Linux/macOS)
curl -fsSL https://get.xcloud.io | bash
```

### Verificar Versão

```bash
xcloud --version
xcloud version  # Mostra informações detalhadas
```

### Atualização

```bash
# Via npm
npm update -g xcloud-cli

# Via CLI (auto-update)
xcloud update
```

## 🔐 Autenticação

### Login Inicial

```bash
# Login via browser
xcloud login

# Login com token
xcloud login --token YOUR_API_TOKEN

# Login para uma organização específica  
xcloud login --org mycompany
```

### Gerenciar Sessões

```bash
# Verificar usuário logado
xcloud whoami

# Logout
xcloud logout

# Listar organizações disponíveis
xcloud orgs list
```

## 🏗️ Comandos de Projeto

### `xcloud init` - Criar Projetos

```bash
# Projeto básico
xcloud init my-project

# Com template específico
xcloud init my-app --template nextjs
xcloud init my-api --template fastapi
xcloud init my-site --template astro

# Templates disponíveis
xcloud init --list-templates

# Criar em diretório específico
xcloud init my-project --dir ./projects/

# Com configurações customizadas
xcloud init my-app --template react --typescript --tailwind
```

### Opções do `init`

| Opção | Descrição | Exemplo |
|-------|-----------|---------|
| `--template` | Template a usar | `--template nextjs` |
| `--dir` | Diretório destino | `--dir ./apps/` |
| `--typescript` | Habilitar TypeScript | `--typescript` |
| `--tailwind` | Adicionar Tailwind CSS | `--tailwind` |
| `--auth` | Configurar autenticação | `--auth supabase` |
| `--database` | Adicionar banco de dados | `--database postgres` |

### `xcloud dev` - Desenvolvimento Local

```bash
# Servidor básico
xcloud dev

# Porta específica
xcloud dev --port 3001

# Com live reload avançado
xcloud dev --hot

# Debug mode
xcloud dev --debug

# Ambiente específico
xcloud dev --env development
```

## 🚀 Deploy e Ambientes

### `xcloud deploy` - Deploy de Aplicações

```bash
# Deploy para preview
xcloud deploy

# Deploy para produção
xcloud deploy --prod

# Deploy com build customizado
xcloud deploy --build-command "npm run build:prod"

# Deploy com diretório específico
xcloud deploy --dir ./dist

# Deploy com configurações
xcloud deploy --env production --region us-east-1
```

### Ambientes e Regiões

```bash
# Listar ambientes
xcloud environments list

# Criar novo ambiente
xcloud environments create staging

# Deploy para ambiente específico
xcloud deploy --env staging

# Regiões disponíveis
xcloud regions list

# Deploy em região específica
xcloud deploy --region eu-west-1
```

### Rollback e Versionamento

```bash
# Listar deploys
xcloud deployments list

# Fazer rollback
xcloud rollback --to-version v1.2.3

# Promover deploy de staging para produção
xcloud promote staging production
```

## 🌐 Gerenciamento de Domínios

### `xcloud domains` - Configurar Domínios

```bash
# Listar domínios
xcloud domains list

# Adicionar domínio
xcloud domains add www.meusite.com

# Adicionar domínio para ambiente específico
xcloud domains add api.meusite.com --env production

# Remover domínio
xcloud domains remove www.meusite.com

# Verificar configuração DNS
xcloud domains verify www.meusite.com

# Gerar certificado SSL
xcloud domains ssl www.meusite.com
```

### Configuração de DNS

```bash
# Ver registros DNS necessários
xcloud domains dns-config www.meusite.com

# Verificar propagação DNS
xcloud domains check-dns www.meusite.com
```

## ⚙️ Variáveis de Ambiente

### `xcloud env` - Gerenciar Variáveis

```bash
# Listar variáveis
xcloud env list

# Adicionar variável
xcloud env add API_URL "https://api.example.com"

# Adicionar segredo (criptografado)
xcloud env add DATABASE_URL "postgres://..." --secret

# Definir para ambiente específico
xcloud env add DEBUG "true" --env development

# Importar de arquivo .env
xcloud env import .env.production --env production

# Exportar variáveis
xcloud env export --env production > .env.backup

# Remover variável
xcloud env remove API_URL

# Editar variável
xcloud env edit DATABASE_URL
```

### Gerenciamento Avançado

```bash
# Copiar variáveis entre ambientes
xcloud env copy --from staging --to production

# Sincronizar com arquivo local
xcloud env sync .env --env development

# Verificar variáveis ausentes
xcloud env validate
```

## 📊 Logs e Monitoramento

### `xcloud logs` - Visualizar Logs

```bash
# Logs em tempo real
xcloud logs --follow

# Logs de período específico
xcloud logs --since 1h
xcloud logs --since "2024-01-01 10:00"

# Logs de função específica
xcloud logs --function api
xcloud logs --function auth-handler

# Logs de ambiente específico
xcloud logs --env production

# Filtrar por nível
xcloud logs --level error
xcloud logs --level warn,error

# Buscar por texto
xcloud logs --grep "payment"
xcloud logs --grep "error" --case-sensitive
```

### `xcloud status` - Status e Métricas

```bash
# Status geral
xcloud status

# Status de ambiente específico
xcloud status --env production

# Métricas de performance
xcloud metrics

# Métricas detalhadas
xcloud metrics --detailed --since 24h

# Status de funcionalidades específicas
xcloud status --functions
xcloud status --databases
xcloud status --domains
```

## 📦 Templates e Componentes

### Templates

```bash
# Listar templates disponíveis
xcloud templates list

# Buscar templates
xcloud templates search react

# Ver detalhes de template
xcloud templates show nextjs

# Atualizar catálogo de templates  
xcloud templates update
```

### Componentes

```bash
# Listar componentes
xcloud components list

# Adicionar componente
xcloud components add @xcloud/auth-component

# Buscar componentes
xcloud components search payment

# Atualizar componente
xcloud components update @xcloud/auth-component

# Remover componente
xcloud components remove @xcloud/auth-component
```

## ⚡ Funções Serverless

### `xcloud functions` - Gerenciar Funções

```bash
# Listar funções
xcloud functions list

# Criar nova função
xcloud functions create my-api --runtime nodejs18

# Deploy de função
xcloud functions deploy my-api

# Invocar função para teste
xcloud functions invoke my-api --data '{"test": true}'

# Logs de função específica
xcloud functions logs my-api --follow

# Configurar função
xcloud functions config my-api --memory 512 --timeout 30
```

### Runtimes Suportados

```bash
# Listar runtimes disponíveis
xcloud functions runtimes

# Criar função com runtime específico
xcloud functions create api-python --runtime python3.11
xcloud functions create api-go --runtime go1.21
xcloud functions create api-rust --runtime rust1.70
```

## 🔧 Configuração Avançada

### Arquivo `xcloud.json`

Configuração do projeto no arquivo `xcloud.json`:

```json
{
  "name": "minha-aplicacao",
  "framework": "nextjs",
  "version": "1.0.0",
  "build": {
    "command": "npm run build",
    "outputDir": ".next",
    "installCommand": "npm install --frozen-lockfile"
  },
  "functions": {
    "runtime": "nodejs18.x",
    "memory": 1024,
    "timeout": 10
  },
  "env": {
    "NODE_ENV": "production"
  },
  "domains": {
    "production": ["www.meusite.com"],
    "staging": ["staging.meusite.com"]
  },
  "redirects": [
    {"source": "/old-page", "destination": "/new-page", "permanent": true}
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {"key": "Access-Control-Allow-Origin", "value": "*"}
      ]
    }
  ]
}
```

### Configuração Global

```bash
# Configurar região padrão
xcloud config set region us-east-1

# Configurar organização padrão
xcloud config set org mycompany

# Ver todas as configurações
xcloud config list

# Reset configurações
xcloud config reset
```

### Aliases e Shortcuts

```bash
# Criar alias para comandos comuns
xcloud alias set deploy-prod "deploy --prod --env production"

# Usar alias
xcloud deploy-prod

# Listar aliases
xcloud alias list

# Remover alias
xcloud alias remove deploy-prod
```

## 🐛 Debug e Troubleshooting

### Debug Mode

```bash
# Executar qualquer comando em modo debug
xcloud --debug deploy

# Logs verbosos
xcloud --verbose logs

# Informações de sistema
xcloud doctor

# Verificar conectividade
xcloud ping
```

### Cache e Limpeza

```bash
# Limpar cache
xcloud cache clear

# Rebuild completo
xcloud cache clear --all && xcloud deploy --force

# Verificar uso de espaço
xcloud cache info
```

## 🎯 Comandos Úteis do Dia a Dia

### Workflow Típico de Desenvolvimento

```bash
# 1. Iniciar projeto
xcloud init meu-projeto --template nextjs

# 2. Desenvolvimento local
xcloud dev

# 3. Deploy para preview
xcloud deploy

# 4. Configurar domínio
xcloud domains add preview.meusite.com

# 5. Deploy para produção
xcloud deploy --prod

# 6. Monitorar aplicação
xcloud logs --follow
```

### Scripts Rápidos

```bash
# Deploy completo com cache limpo
xcloud cache clear && xcloud deploy --prod

# Verificação completa de saúde
xcloud status && xcloud domains verify-all

# Backup de configurações
xcloud env export > backup.env && xcloud config export > config.json
```

## 🔍 Referência Rápida

### Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `xcloud init` | Criar novo projeto |
| `xcloud dev` | Servidor desenvolvimento |
| `xcloud deploy` | Fazer deploy |
| `xcloud logs` | Visualizar logs |
| `xcloud domains` | Gerenciar domínios |
| `xcloud env` | Variáveis ambiente |
| `xcloud status` | Status aplicação |

### Flags Globais

| Flag | Descrição |
|------|-----------|
| `--debug` | Modo debug |
| `--verbose` | Logs detalhados |
| `--json` | Output em JSON |
| `--no-color` | Sem cores |
| `--help` | Ajuda |

---

🎉 **Agora você é um expert na xCloud CLI!** Use este guia como referência sempre que precisar explorar novos recursos ou relembrar comandos específicos.