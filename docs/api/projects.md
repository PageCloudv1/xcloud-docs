# Projetos

Os endpoints de projetos permitem gerenciar projetos na xCloud Platform, incluindo criação, listagem, atualização e exclusão.

## Criar Projeto

Cria um novo projeto na plataforma.

```http
POST /api/v1/projects
```

### Parâmetros da Requisição

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | string | Sim | Nome do projeto (3-50 caracteres) |
| `description` | string | Não | Descrição do projeto |
| `template` | string | Não | Template base (`react`, `vue`, `nextjs`, `python`, etc.) |
| `region` | string | Não | Região de deploy (padrão: `us-east-1`) |
| `environment_variables` | object | Não | Variáveis de ambiente |
| `domain` | string | Não | Domínio customizado |

### Exemplo de Requisição

```bash
curl -X POST https://api.xcloud.dev/api/v1/projects \
  -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "minha-app-web",
    "description": "Aplicação React para e-commerce",
    "template": "react",
    "region": "us-east-1",
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.minhaapp.com"
    }
  }'
```

### Resposta de Sucesso

**Status:** `201 Created`

```json
{
  "id": "proj_1234567890abcdef",
  "name": "minha-app-web",
  "description": "Aplicação React para e-commerce",
  "template": "react",
  "region": "us-east-1",
  "status": "initializing",
  "repository": {
    "url": "https://github.com/user/minha-app-web",
    "branch": "main"
  },
  "urls": {
    "preview": "https://minha-app-web-preview.xcloud.app",
    "production": null
  },
  "environment_variables": {
    "NODE_ENV": "production",
    "API_URL": "https://api.minhaapp.com"
  },
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z"
}
```

## Listar Projetos

Lista todos os projetos da conta.

```http
GET /api/v1/projects
```

### Parâmetros de Query

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `limit` | integer | Número de resultados por página (máximo: 100) |
| `cursor` | string | Cursor para paginação |
| `status` | string | Filtrar por status (`active`, `archived`, `suspended`) |
| `template` | string | Filtrar por template |
| `search` | string | Buscar por nome ou descrição |

### Exemplo de Requisição

```bash
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     "https://api.xcloud.dev/api/v1/projects?limit=10&status=active"
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "data": [
    {
      "id": "proj_1234567890abcdef",
      "name": "minha-app-web",
      "description": "Aplicação React para e-commerce",
      "template": "react",
      "region": "us-east-1",
      "status": "active",
      "urls": {
        "preview": "https://minha-app-web-preview.xcloud.app",
        "production": "https://minha-app-web.xcloud.app"
      },
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6InByb2pfMTIzNDU2Nzg5MGFiY2RlZiJ9",
    "limit": 10
  }
}
```

## Obter Projeto

Obtém detalhes de um projeto específico.

```http
GET /api/v1/projects/{project_id}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `project_id` | string | ID único do projeto |

### Exemplo de Requisição

```bash
curl -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
     https://api.xcloud.dev/api/v1/projects/proj_1234567890abcdef
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "id": "proj_1234567890abcdef",
  "name": "minha-app-web",
  "description": "Aplicação React para e-commerce",
  "template": "react",
  "region": "us-east-1",
  "status": "active",
  "repository": {
    "url": "https://github.com/user/minha-app-web",
    "branch": "main",
    "auto_deploy": true
  },
  "urls": {
    "preview": "https://minha-app-web-preview.xcloud.app",
    "production": "https://minha-app-web.xcloud.app"
  },
  "environment_variables": {
    "NODE_ENV": "production",
    "API_URL": "https://api.minhaapp.com"
  },
  "build_settings": {
    "framework": "react",
    "build_command": "npm run build",
    "output_directory": "dist",
    "node_version": "18"
  },
  "metrics": {
    "deployments_count": 15,
    "last_deployment": "2025-01-15T10:30:00Z",
    "monthly_requests": 150000,
    "storage_used_mb": 250
  },
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

## Atualizar Projeto

Atualiza as configurações de um projeto.

```http
PUT /api/v1/projects/{project_id}
```

### Parâmetros da Requisição

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome do projeto |
| `description` | string | Descrição do projeto |
| `environment_variables` | object | Variáveis de ambiente |
| `domain` | string | Domínio customizado |
| `auto_deploy` | boolean | Deploy automático em push |

### Exemplo de Requisição

```bash
curl -X PUT https://api.xcloud.dev/api/v1/projects/proj_1234567890abcdef \
  -H "Authorization: Bearer xcp_live_1234567890abcdef..." \
  -H "Content-Type: application/json" \
  -d '{
    "description": "E-commerce completo com React e Node.js",
    "domain": "loja.exemplo.com",
    "environment_variables": {
      "NODE_ENV": "production",
      "API_URL": "https://api.loja.exemplo.com",
      "STRIPE_KEY": "sk_live_..."
    }
  }'
```

### Resposta de Sucesso

**Status:** `200 OK`

```json
{
  "id": "proj_1234567890abcdef",
  "name": "minha-app-web",
  "description": "E-commerce completo com React e Node.js",
  "domain": "loja.exemplo.com",
  "environment_variables": {
    "NODE_ENV": "production",
    "API_URL": "https://api.loja.exemplo.com",
    "STRIPE_KEY": "sk_live_..."
  },
  "updated_at": "2025-01-15T14:20:00Z"
}
```

## Excluir Projeto

Exclui um projeto permanentemente.

```http
DELETE /api/v1/projects/{project_id}
```

### Exemplo de Requisição

```bash
curl -X DELETE https://api.xcloud.dev/api/v1/projects/proj_1234567890abcdef \
  -H "Authorization: Bearer xcp_live_1234567890abcdef..."
```

### Resposta de Sucesso

**Status:** `204 No Content`

## Status de Projeto

| Status | Descrição |
|--------|-----------|
| `initializing` | Projeto sendo criado |
| `active` | Projeto ativo e funcionando |
| `deploying` | Deploy em andamento |
| `build_failed` | Falha no build |
| `suspended` | Projeto suspenso |
| `archived` | Projeto arquivado |

## Códigos de Erro

| Código HTTP | Código do Erro | Descrição |
|-------------|----------------|-----------|
| `400` | `INVALID_PROJECT_NAME` | Nome do projeto inválido |
| `400` | `INVALID_TEMPLATE` | Template não suportado |
| `404` | `PROJECT_NOT_FOUND` | Projeto não encontrado |
| `409` | `PROJECT_NAME_EXISTS` | Nome já existe na conta |
| `422` | `VALIDATION_ERROR` | Erro de validação nos dados |

### Exemplo de Resposta de Erro

```json
{
  "error": {
    "code": "PROJECT_NAME_EXISTS",
    "message": "Um projeto com este nome já existe",
    "details": {
      "field": "name",
      "existing_project_id": "proj_abcdef1234567890"
    },
    "request_id": "req_1234567890"
  }
}
```