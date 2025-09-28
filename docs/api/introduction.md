# Referência da API

A xCloud Platform oferece uma API REST completa para gerenciar projetos, deployments e recursos da plataforma. Esta seção contém a documentação completa de todos os endpoints disponíveis.

## Base URL

```
https://api.xcloud.dev
```

## Versionamento

Todas as APIs usam versionamento semântico através do cabeçalho ou path:

```http
# Via header
X-API-Version: v1

# Via path (recomendado)
/api/v1/endpoint
```

## Formatos Suportados

- **Content-Type**: `application/json`
- **Accept**: `application/json`

## Status Codes

A API utiliza os seguintes códigos de status HTTP:

| Código | Status | Descrição |
|--------|---------|-----------|
| `200` | OK | Requisição processada com sucesso |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Requisição processada, sem conteúdo de resposta |
| `400` | Bad Request | Dados da requisição inválidos |
| `401` | Unauthorized | Autenticação necessária |
| `403` | Forbidden | Sem permissão para acessar o recurso |
| `404` | Not Found | Recurso não encontrado |
| `422` | Unprocessable Entity | Validação falhou |
| `429` | Too Many Requests | Limite de rate exceeded |
| `500` | Internal Server Error | Erro interno do servidor |

## Rate Limiting

A API implementa rate limiting para garantir o uso justo:

- **Limite**: 1000 requisições por hora por API key
- **Headers de resposta**:
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requisições restantes
  - `X-RateLimit-Reset`: Timestamp do reset do limite

## Paginação

Endpoints que retornam listas usam paginação baseada em cursor:

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

### Parâmetros de Paginação

- `limit` (opcional): Número de items por página (máximo: 100, padrão: 50)
- `cursor` (opcional): Cursor para próxima página

## Tratamento de Erros

Todos os erros seguem um formato consistente:

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

### Códigos de Erro Comuns

- `INVALID_REQUEST`: Formato da requisição inválido
- `AUTHENTICATION_FAILED`: Falha na autenticação
- `AUTHORIZATION_FAILED`: Sem permissão para o recurso
- `VALIDATION_ERROR`: Erro de validação nos dados
- `RESOURCE_NOT_FOUND`: Recurso não encontrado
- `RATE_LIMIT_EXCEEDED`: Limite de requisições excedido
- `INTERNAL_ERROR`: Erro interno do servidor

## SDKs Oficiais

- [JavaScript/Node.js SDK](https://github.com/PageCloudv1/xcloud-js)
- [Python SDK](https://github.com/PageCloudv1/xcloud-python)
- [Go SDK](https://github.com/PageCloudv1/xcloud-go)

## Recursos

- [Autenticação](/docs/api/authentication)
- [Projetos](/docs/api/projects)
- [Deployments](/docs/api/deployments)
- [Modelos de Dados](/docs/api/data-models)