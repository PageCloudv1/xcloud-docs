# Autenticação

A API da xCloud Platform utiliza autenticação baseada em API Keys para identificar e autorizar requisições.

## API Keys

### Gerando uma API Key

Você pode gerar API Keys através do dashboard web ou CLI:

#### Via Dashboard Web

1. Acesse [console.xcloud.dev](https://console.xcloud.dev)
2. Vá para **Settings** > **API Keys**
3. Clique em **Generate New Key**
4. Escolha as permissões necessárias
5. Salve a chave com segurança (ela só será exibida uma vez)

#### Via CLI

```bash
# Fazer login
xcloud auth login

# Gerar nova API key
xcloud auth apikey create \
  --name "Minha API Key" \
  --scope "projects:read,projects:write,deployments:read"
```

### Usando API Keys

Inclua sua API key no header `Authorization` de todas as requisições:

```http
GET /api/v1/projects
Host: api.xcloud.dev
Authorization: Bearer xcp_live_1234567890abcdef...
Content-Type: application/json
```

### Exemplo com cURL

```bash
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     -H "Content-Type: application/json" \
     https://api.xcloud.dev/api/v1/projects
```

### Exemplo com JavaScript

```javascript
const response = await fetch('https://api.xcloud.dev/api/v1/projects', {
  headers: {
    'Authorization': 'Bearer xcp_live_1234567890abcdef...',
    'Content-Type': 'application/json'
  }
});
```

## Tipos de API Keys

| Tipo | Prefixo | Ambiente | Descrição |
|------|---------|----------|-----------|
| **Live** | `xcp_live_` | Produção | Para uso em produção |
| **Test** | `xcp_test_` | Desenvolvimento | Para testes e desenvolvimento |

:::warning Segurança
- Nunca exponha API keys em código cliente (frontend)
- Use sempre HTTPS em produção
- Rotacione suas keys regularmente
- Use scopes mínimos necessários
:::

## Scopes (Permissões)

As API keys podem ser configuradas com scopes específicos para limitar o acesso:

### Scopes Disponíveis

| Scope | Descrição |
|-------|-----------|
| `projects:read` | Listar e visualizar projetos |
| `projects:write` | Criar, editar e excluir projetos |
| `deployments:read` | Visualizar deployments e logs |
| `deployments:write` | Criar e gerenciar deployments |
| `functions:read` | Visualizar funções serverless |
| `functions:write` | Gerenciar funções serverless |
| `analytics:read` | Acessar dados de analytics |
| `billing:read` | Visualizar informações de cobrança |
| `admin` | Acesso completo à conta |

### Exemplo de Configuração

```bash
# API key com acesso limitado
xcloud auth apikey create \
  --name "CI/CD Pipeline" \
  --scope "projects:read,deployments:write"

# API key para analytics
xcloud auth apikey create \
  --name "Analytics Dashboard" \
  --scope "analytics:read,projects:read"
```

## Autenticação de Webhooks

Para webhooks, a xCloud Platform envia um header de assinatura:

```http
POST /webhook
Host: seu-app.com
X-XCloud-Signature: sha256=1234567890abcdef...
Content-Type: application/json
```

### Verificando Assinatura do Webhook

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(body, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex');
  
  return `sha256=${expectedSignature}` === signature;
}

// Uso
const isValid = verifyWebhookSignature(
  req.body,
  req.headers['x-xcloud-signature'],
  process.env.XCLOUD_WEBHOOK_SECRET
);
```

## Renovação de API Keys

```bash
# Listar keys existentes
xcloud auth apikey list

# Renovar uma key específica
xcloud auth apikey rotate --id key_1234567890

# Revogar uma key
xcloud auth apikey revoke --id key_1234567890
```

## Limitações e Quotas

### Rate Limits por Tipo de Key

| Tipo | Requisições/Hora | Burst Limit |
|------|------------------|-------------|
| **Test** | 500 | 50/minuto |
| **Live** | 5,000 | 100/minuto |

### Monitoramento de Uso

```bash
# Verificar uso atual da API key
xcloud auth apikey usage --id key_1234567890

# Ver histórico de requisições
xcloud auth apikey logs --id key_1234567890 --last 24h
```

## Codes de Erro de Autenticação

| Código HTTP | Código do Erro | Descrição |
|-------------|----------------|-----------|
| `401` | `MISSING_API_KEY` | API key não fornecida |
| `401` | `INVALID_API_KEY` | API key inválida ou expirada |
| `403` | `INSUFFICIENT_SCOPE` | Scope insuficiente para a operação |
| `403` | `ACCOUNT_SUSPENDED` | Conta suspensa |
| `429` | `RATE_LIMIT_EXCEEDED` | Limite de requisições excedido |

### Exemplo de Resposta de Erro

```json
{
  "error": {
    "code": "INSUFFICIENT_SCOPE",
    "message": "API key não tem permissão para esta operação",
    "details": {
      "required_scope": "projects:write",
      "current_scopes": ["projects:read"]
    },
    "request_id": "req_1234567890"
  }
}
```