# Deployments

Os endpoints de deployments permitem gerenciar deployments de projetos, incluindo criação, listagem, monitoramento e acesso aos logs.

## Criar Deployment

Cria um novo deployment para um projeto.

```http
POST /api/v1/projects/{project_id}/deployments
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `project_id` | string | ID único do projeto |

### Parâmetros da Requisição

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `ref` | string | Não | Branch, tag ou commit SHA (padrão: branch principal) |
| `environment` | string | Não | Ambiente de deploy (`preview`, `production`) |
| `force_build` | boolean | Não | Força rebuild mesmo sem mudanças |
| `environment_variables` | object | Não | Variáveis específicas do deployment |

### Exemplo de Requisição

```bash
curl -X POST https://api.xcloud.dev/api/v1/projects/proj_1234567890abcdef/deployments \
  -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
  -H "Content-Type: application/json" \
  -d '{
    "ref": "feature/new-checkout",
    "environment": "preview",
    "force_build": false,
    "environment_variables": {
      "FEATURE_FLAG_NEW_UI": "true",
      "API_URL": "https://staging-api.exemplo.com"
    }
  }'
```

### Resposta de Sucesso

**Status:** `201 Created`

```json
{
  "id": "dep_1234567890abcdef",
  "project_id": "proj_1234567890abcdef",
  "status": "queued",
  "environment": "preview",
  "ref": {
    "type": "branch",
    "name": "feature/new-checkout",
    "sha": "abc123def456"
  },
  "url": "https://new-checkout-proj123.xcloud.app",
  "build": {
    "id": "build_1234567890abcdef",
    "status": "pending",
    "logs_url": "/api/v1/deployments/dep_1234567890abcdef/logs"
  },
  "environment_variables": {
    "FEATURE_FLAG_NEW_UI": "true",
    "API_URL": "https://staging-api.exemplo.com"
  },
  "created_at": "2025-01-15T14:30:00Z",
  "started_at": null,
  "completed_at": null
}
```

## Listar Deployments

Lista deployments de um projeto.

```http
GET /api/v1/projects/{project_id}/deployments
```

### Parâmetros de Query

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `limit` | integer | Número de resultados por página (máximo: 100) |
| `cursor` | string | Cursor para paginação |
| `status` | string | Filtrar por status |
| `environment` | string | Filtrar por ambiente (`preview`, `production`) |
| `ref` | string | Filtrar por branch/tag |

### Exemplo de Requisição

```bash
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     "https://api.xcloud.dev/api/v1/projects/proj_1234567890abcdef/deployments?limit=10&status=success"
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "data": [
    {
      "id": "dep_1234567890abcdef",
      "project_id": "proj_1234567890abcdef",
      "status": "success",
      "environment": "production",
      "ref": {
        "type": "branch",
        "name": "main",
        "sha": "abc123def456"
      },
      "url": "https://minha-app-web.xcloud.app",
      "build": {
        "id": "build_1234567890abcdef",
        "status": "completed",
        "duration_seconds": 125
      },
      "created_at": "2025-01-15T10:30:00Z",
      "started_at": "2025-01-15T10:30:15Z",
      "completed_at": "2025-01-15T10:32:20Z"
    }
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6ImRlcF8xMjM0NTY3ODkwYWJjZGVmIn0=",
    "limit": 10
  }
}
```

## Obter Deployment

Obtém detalhes de um deployment específico.

```http
GET /api/v1/deployments/{deployment_id}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `deployment_id` | string | ID único do deployment |

### Exemplo de Requisição

```bash
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     https://api.xcloud.dev/api/v1/deployments/dep_1234567890abcdef
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "id": "dep_1234567890abcdef",
  "project_id": "proj_1234567890abcdef",
  "status": "success",
  "environment": "production",
  "ref": {
    "type": "branch",
    "name": "main",
    "sha": "abc123def456",
    "message": "feat: add new checkout flow"
  },
  "url": "https://minha-app-web.xcloud.app",
  "build": {
    "id": "build_1234567890abcdef",
    "status": "completed",
    "duration_seconds": 125,
    "output_size_mb": 15.2,
    "cache_hit_rate": 0.85
  },
  "environment_variables": {
    "NODE_ENV": "production",
    "API_URL": "https://api.exemplo.com"
  },
  "metrics": {
    "bundle_size_mb": 2.1,
    "build_time_seconds": 125,
    "functions_count": 3,
    "pages_count": 12
  },
  "created_at": "2025-01-15T10:30:00Z",
  "started_at": "2025-01-15T10:30:15Z",
  "completed_at": "2025-01-15T10:32:20Z"
}
```

## Obter Logs do Deployment

Obtém logs em tempo real de um deployment.

```http
GET /api/v1/deployments/{deployment_id}/logs
```

### Parâmetros de Query

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `follow` | boolean | Seguir logs em tempo real (Server-Sent Events) |
| `tail` | integer | Número de linhas finais (padrão: 100) |
| `since` | string | Timestamp ISO 8601 para filtrar logs |
| `level` | string | Nível de log (`debug`, `info`, `warn`, `error`) |

### Exemplo de Requisição

```bash
# Obter logs estáticos
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     "https://api.xcloud.dev/api/v1/deployments/dep_1234567890abcdef/logs?tail=50"

# Seguir logs em tempo real
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     -H "Accept: text/event-stream" \
     "https://api.xcloud.dev/api/v1/deployments/dep_1234567890abcdef/logs?follow=true"
```

### Resposta de Sucesso (Logs Estáticos)

**Status:** `200 OK`
**Content-Type:** `application/json`

```json
{
  "logs": [
    {
      "id": "log_1234567890abcdef",
      "timestamp": "2025-01-15T10:30:15.123Z",
      "level": "info",
      "source": "build",
      "message": "Starting build process..."
    },
    {
      "id": "log_2234567890abcdef",
      "timestamp": "2025-01-15T10:30:20.456Z",
      "level": "info",
      "source": "build",
      "message": "Installing dependencies..."
    },
    {
      "id": "log_3234567890abcdef",
      "timestamp": "2025-01-15T10:31:45.789Z",
      "level": "info",
      "source": "build",
      "message": "Build completed successfully"
    }
  ],
  "has_more": false,
  "total_lines": 45
}
```

### Resposta de Sucesso (Logs em Tempo Real)

**Status:** `200 OK`
**Content-Type:** `text/event-stream`

```
data: {"timestamp": "2025-01-15T10:30:15.123Z", "level": "info", "source": "build", "message": "Starting build process..."}

data: {"timestamp": "2025-01-15T10:30:20.456Z", "level": "info", "source": "build", "message": "Installing dependencies..."}

data: {"timestamp": "2025-01-15T10:31:45.789Z", "level": "info", "source": "build", "message": "Build completed successfully"}

event: close
data: {"reason": "deployment_completed"}
```

## Cancelar Deployment

Cancela um deployment em andamento.

```http
DELETE /api/v1/deployments/{deployment_id}
```

### Exemplo de Requisição

```bash
curl -X DELETE https://api.xcloud.dev/api/v1/deployments/dep_1234567890abcdef \
  -H "Authorization: Bearer xcp_live_1234567890abcdef..."
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "id": "dep_1234567890abcdef",
  "status": "cancelled",
  "cancelled_at": "2025-01-15T10:35:00Z",
  "message": "Deployment cancelado pelo usuário"
}
```

## Status de Deployment

| Status | Descrição |
|--------|-----------|
| `queued` | Na fila para execução |
| `building` | Build em andamento |
| `deploying` | Deploy em andamento |
| `success` | Deploy concluído com sucesso |
| `failed` | Deploy falhou |
| `cancelled` | Deploy cancelado |
| `skipped` | Deploy pulado (sem mudanças) |

## Fontes de Log

| Fonte | Descrição |
|-------|-----------|
| `build` | Logs do processo de build |
| `deploy` | Logs do processo de deploy |
| `runtime` | Logs da aplicação em runtime |
| `system` | Logs do sistema xCloud |

## Códigos de Erro

| Código HTTP | Código do Erro | Descrição |
|-------------|----------------|-----------|
| `400` | `INVALID_REF` | Branch, tag ou commit inválido |
| `404` | `DEPLOYMENT_NOT_FOUND` | Deployment não encontrado |
| `409` | `DEPLOYMENT_IN_PROGRESS` | Já existe deployment em andamento |
| `422` | `BUILD_FAILED` | Falha no processo de build |
| `503` | `SERVICE_UNAVAILABLE` | Serviço de deploy indisponível |

### Exemplo de Resposta de Erro

```json
{
  "error": {
    "code": "BUILD_FAILED",
    "message": "Falha no processo de build",
    "details": {
      "step": "install_dependencies",
      "exit_code": 1,
      "logs_url": "/api/v1/deployments/dep_1234567890abcdef/logs"
    },
    "request_id": "req_1234567890"
  }
}
```

## Webhooks de Deployment

Configure webhooks para receber notificações sobre mudanças de status:

### Eventos Disponíveis

- `deployment.started`
- `deployment.succeeded` 
- `deployment.failed`
- `deployment.cancelled`

### Payload do Webhook

```json
{
  "event": "deployment.succeeded",
  "timestamp": "2025-01-15T10:32:20Z",
  "data": {
    "id": "dep_1234567890abcdef",
    "project_id": "proj_1234567890abcdef",
    "status": "success",
    "url": "https://minha-app-web.xcloud.app",
    "duration_seconds": 125
  }
}
```