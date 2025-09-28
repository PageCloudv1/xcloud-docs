# Modelos de Dados

Esta seção documenta os modelos de dados utilizados pela API da xCloud Platform.

## Project

Representa um projeto na plataforma.

### Estrutura

```typescript
interface Project {
  id: string;                    // ID único do projeto
  name: string;                  // Nome do projeto
  description?: string;          // Descrição (opcional)
  template: string;              // Template utilizado
  region: string;                // Região de deploy
  status: ProjectStatus;         // Status atual
  repository?: Repository;       // Informações do repositório
  urls: ProjectUrls;            // URLs do projeto
  environment_variables: Record<string, string>; // Variáveis de ambiente
  build_settings: BuildSettings; // Configurações de build
  metrics?: ProjectMetrics;      // Métricas do projeto
  created_at: string;           // Data de criação (ISO 8601)
  updated_at: string;           // Data de atualização (ISO 8601)
}
```

### ProjectStatus

```typescript
enum ProjectStatus {
  INITIALIZING = 'initializing',  // Projeto sendo criado
  ACTIVE = 'active',              // Projeto ativo
  DEPLOYING = 'deploying',        // Deploy em andamento
  BUILD_FAILED = 'build_failed',  // Falha no build
  SUSPENDED = 'suspended',        // Projeto suspenso
  ARCHIVED = 'archived'           // Projeto arquivado
}
```

### Repository

```typescript
interface Repository {
  url: string;        // URL do repositório Git
  branch: string;     // Branch principal
  auto_deploy: boolean; // Deploy automático ativo
}
```

### ProjectUrls

```typescript
interface ProjectUrls {
  preview?: string;    // URL de preview
  production?: string; // URL de produção
}
```

### BuildSettings

```typescript
interface BuildSettings {
  framework: string;        // Framework detectado
  build_command: string;    // Comando de build
  output_directory: string; // Diretório de output
  node_version: string;     // Versão do Node.js
}
```

### ProjectMetrics

```typescript
interface ProjectMetrics {
  deployments_count: number;      // Número total de deployments
  last_deployment?: string;       // Data do último deployment
  monthly_requests: number;       // Requisições mensais
  storage_used_mb: number;        // Armazenamento usado (MB)
}
```

### Exemplo

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
    "API_URL": "https://api.exemplo.com"
  },
  "build_settings": {
    "framework": "react",
    "build_command": "npm run build",
    "output_directory": "dist",
    "node_version": "18"
  },
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

## Deployment

Representa um deployment de um projeto.

### Estrutura

```typescript
interface Deployment {
  id: string;                    // ID único do deployment
  project_id: string;           // ID do projeto
  status: DeploymentStatus;     // Status atual
  environment: Environment;     // Ambiente de deploy
  ref: GitRef;                  // Referência Git
  url?: string;                 // URL do deployment
  build: Build;                 // Informações do build
  environment_variables: Record<string, string>; // Variáveis específicas
  metrics?: DeploymentMetrics;  // Métricas do deployment
  created_at: string;          // Data de criação
  started_at?: string;         // Data de início
  completed_at?: string;       // Data de conclusão
}
```

### DeploymentStatus

```typescript
enum DeploymentStatus {
  QUEUED = 'queued',           // Na fila
  BUILDING = 'building',       // Build em andamento
  DEPLOYING = 'deploying',     // Deploy em andamento
  SUCCESS = 'success',         // Concluído com sucesso
  FAILED = 'failed',           // Falhou
  CANCELLED = 'cancelled',     // Cancelado
  SKIPPED = 'skipped'          // Pulado (sem mudanças)
}
```

### Environment

```typescript
enum Environment {
  PREVIEW = 'preview',         // Ambiente de preview
  PRODUCTION = 'production'    // Ambiente de produção
}
```

### GitRef

```typescript
interface GitRef {
  type: 'branch' | 'tag' | 'commit'; // Tipo da referência
  name: string;                       // Nome da branch/tag
  sha: string;                       // SHA do commit
  message?: string;                  // Mensagem do commit
}
```

### Build

```typescript
interface Build {
  id: string;              // ID único do build
  status: BuildStatus;     // Status do build
  duration_seconds?: number; // Duração em segundos
  output_size_mb?: number; // Tamanho do output
  cache_hit_rate?: number; // Taxa de cache hit
  logs_url?: string;       // URL dos logs
}
```

### BuildStatus

```typescript
enum BuildStatus {
  PENDING = 'pending',         // Pendente
  RUNNING = 'running',         // Em execução
  COMPLETED = 'completed',     // Completado
  FAILED = 'failed',           // Falhou
  CANCELLED = 'cancelled'      // Cancelado
}
```

### DeploymentMetrics

```typescript
interface DeploymentMetrics {
  bundle_size_mb: number;    // Tamanho do bundle
  build_time_seconds: number; // Tempo de build
  functions_count: number;    // Número de funções
  pages_count: number;        // Número de páginas
}
```

### Exemplo

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
    "output_size_mb": 15.2
  },
  "created_at": "2025-01-15T10:30:00Z",
  "started_at": "2025-01-15T10:30:15Z",
  "completed_at": "2025-01-15T10:32:20Z"
}
```

## Log

Representa uma entrada de log.

### Estrutura

```typescript
interface Log {
  id: string;        // ID único do log
  timestamp: string; // Timestamp (ISO 8601)
  level: LogLevel;   // Nível do log
  source: LogSource; // Fonte do log
  message: string;   // Mensagem
}
```

### LogLevel

```typescript
enum LogLevel {
  DEBUG = 'debug',   // Debug
  INFO = 'info',     // Informação
  WARN = 'warn',     // Aviso
  ERROR = 'error'    // Erro
}
```

### LogSource

```typescript
enum LogSource {
  BUILD = 'build',     // Processo de build
  DEPLOY = 'deploy',   // Processo de deploy
  RUNTIME = 'runtime', // Runtime da aplicação
  SYSTEM = 'system'    // Sistema xCloud
}
```

### Exemplo

```json
{
  "id": "log_1234567890abcdef",
  "timestamp": "2025-01-15T10:30:15.123Z",
  "level": "info",
  "source": "build",
  "message": "Installing dependencies..."
}
```

## Error

Representa um erro da API.

### Estrutura

```typescript
interface ApiError {
  error: {
    code: string;           // Código do erro
    message: string;        // Mensagem principal
    details?: any;          // Detalhes adicionais
    request_id: string;     // ID da requisição
  };
}
```

### Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| `INVALID_REQUEST` | Formato da requisição inválido |
| `AUTHENTICATION_FAILED` | Falha na autenticação |
| `AUTHORIZATION_FAILED` | Sem permissão |
| `VALIDATION_ERROR` | Erro de validação |
| `RESOURCE_NOT_FOUND` | Recurso não encontrado |
| `RATE_LIMIT_EXCEEDED` | Limite excedido |
| `INTERNAL_ERROR` | Erro interno |

### Exemplo

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Os dados fornecidos são inválidos",
    "details": {
      "field": "name",
      "message": "Nome é obrigatório"
    },
    "request_id": "req_1234567890"
  }
}
```

## Pagination

Representa informações de paginação.

### Estrutura

```typescript
interface Pagination {
  has_more: boolean;     // Há mais resultados
  next_cursor?: string;  // Cursor para próxima página
  limit: number;         // Limite por página
}
```

### Exemplo

```json
{
  "data": [...],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTIzNDU2Nzg5MH0=",
    "limit": 50
  }
}
```

## Webhook

Representa um payload de webhook.

### Estrutura

```typescript
interface WebhookPayload {
  event: string;     // Nome do evento
  timestamp: string; // Timestamp do evento
  data: any;        // Dados específicos do evento
}
```

### Eventos Disponíveis

| Evento | Descrição |
|--------|-----------|
| `project.created` | Projeto criado |
| `project.updated` | Projeto atualizado |
| `project.deleted` | Projeto excluído |
| `deployment.started` | Deploy iniciado |
| `deployment.succeeded` | Deploy com sucesso |
| `deployment.failed` | Deploy falhou |
| `deployment.cancelled` | Deploy cancelado |

### Exemplo

```json
{
  "event": "deployment.succeeded",
  "timestamp": "2025-01-15T10:32:20Z",
  "data": {
    "id": "dep_1234567890abcdef",
    "project_id": "proj_1234567890abcdef",
    "status": "success",
    "url": "https://minha-app-web.xcloud.app"
  }
}
```