# ⚡ Trabalhando com Funções Serverless

As funções serverless da xCloud permitem executar código backend sem gerenciar servidores. Este guia completo mostra como criar, configurar e otimizar suas funções serverless.

## 🎯 O que são Funções Serverless?

Funções serverless são pequenos trechos de código que executam sob demanda em resposta a eventos (HTTP requests, timers, webhooks, etc.). Na xCloud, você paga apenas pelo tempo de execução, sem custos fixos de servidor.

### Vantagens das Funções Serverless

- 💰 **Custo eficiente** - Pague apenas pelo que usar
- ⚡ **Escalabilidade automática** - De 0 a milhões de requests
- 🔧 **Zero manutenção** - Sem gerenciamento de infraestrutura  
- 🚀 **Deploy instantâneo** - Código em produção em segundos
- 🌍 **Edge computing** - Execução próxima aos usuários

## 📋 Pré-requisitos

- xCloud CLI instalada e autenticada
- Projeto xCloud configurado
- Conhecimento básico da linguagem escolhida

## 🚀 Criando sua Primeira Função

### Passo 1: Inicializar Função

```bash
# Criar nova função
xcloud functions create minha-api --runtime nodejs18

# Ver runtimes disponíveis
xcloud functions runtimes
```

Runtimes suportados:
- **Node.js**: 16.x, 18.x, 20.x
- **Python**: 3.8, 3.9, 3.10, 3.11
- **Go**: 1.19, 1.20, 1.21
- **Rust**: 1.70+
- **PHP**: 8.1, 8.2
- **Java**: 11, 17, 21

### Passo 2: Estrutura da Função

```bash
cd minha-api
```

Estrutura gerada:

```
minha-api/
├── index.js              # Código da função
├── package.json          # Dependências
├── xcloud-function.json  # Configuração
└── README.md             # Documentação
```

### Passo 3: Implementar a Função

```javascript
// index.js
export default async function handler(event, context) {
  // Dados da requisição
  const { method, path, headers, body, query } = event;
  
  // Lógica da função
  switch (method) {
    case 'GET':
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Hello from xCloud!',
          timestamp: new Date().toISOString(),
          path: path,
          query: query
        })
      };
    
    case 'POST':
      const data = JSON.parse(body || '{}');
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Data received',
          data: data
        })
      };
    
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: 'Method not allowed'
        })
      };
  }
}
```

### Passo 4: Configurar Função

```json
// xcloud-function.json
{
  "name": "minha-api",
  "runtime": "nodejs18.x",
  "handler": "index.handler",
  "memory": 512,
  "timeout": 30,
  "environment": {
    "NODE_ENV": "production"
  },
  "routes": [
    {
      "method": "GET",
      "path": "/api/hello"
    },
    {
      "method": "POST", 
      "path": "/api/data"
    }
  ]
}
```

### Passo 5: Deploy da Função

```bash
# Deploy da função
xcloud functions deploy minha-api

# Testar localmente primeiro
xcloud functions dev minha-api
```

## 🔧 Exemplos Práticos por Runtime

### Node.js - API REST

```javascript
// functions/user-api/index.js
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamodb = DynamoDBDocument.from(new DynamoDB({}));

export default async function handler(event, context) {
  const { method, path, body } = event;
  const userId = path.split('/')[3]; // /api/users/{id}
  
  try {
    switch (method) {
      case 'GET':
        if (userId) {
          // Get specific user
          const result = await dynamodb.get({
            TableName: 'users',
            Key: { id: userId }
          });
          
          return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
          };
        } else {
          // List users
          const result = await dynamodb.scan({
            TableName: 'users'
          });
          
          return {
            statusCode: 200,
            body: JSON.stringify(result.Items)
          };
        }
      
      case 'POST':
        const userData = JSON.parse(body);
        await dynamodb.put({
          TableName: 'users',
          Item: {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
          }
        });
        
        return {
          statusCode: 201,
          body: JSON.stringify({ message: 'User created' })
        };
      
      case 'PUT':
        const updateData = JSON.parse(body);
        await dynamodb.put({
          TableName: 'users',
          Item: {
            id: userId,
            ...updateData,
            updatedAt: new Date().toISOString()
          }
        });
        
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User updated' })
        };
      
      case 'DELETE':
        await dynamodb.delete({
          TableName: 'users',
          Key: { id: userId }
        });
        
        return {
          statusCode: 204,
          body: ''
        };
      
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
}
```

### Python - Processamento de Dados

```python
# functions/data-processor/main.py
import json
import boto3
import pandas as pd
from io import BytesIO

s3 = boto3.client('s3')

def handler(event, context):
    """
    Processa arquivos CSV do S3 e gera relatórios
    """
    try:
        # Parse event
        body = json.loads(event.get('body', '{}'))
        bucket = body.get('bucket')
        key = body.get('key')
        
        if not bucket or not key:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'bucket and key required'})
            }
        
        # Download do S3
        response = s3.get_object(Bucket=bucket, Key=key)
        csv_data = response['Body'].read()
        
        # Processar dados
        df = pd.read_csv(BytesIO(csv_data))
        
        # Análise
        report = {
            'total_rows': len(df),
            'columns': list(df.columns),
            'summary_stats': df.describe().to_dict(),
            'missing_values': df.isnull().sum().to_dict(),
            'data_types': df.dtypes.to_dict()
        }
        
        # Salvar relatório
        report_key = f"reports/{key.replace('.csv', '_report.json')}"
        s3.put_object(
            Bucket=bucket,
            Key=report_key,
            Body=json.dumps(report, indent=2, default=str),
            ContentType='application/json'
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Processing complete',
                'report_location': f's3://{bucket}/{report_key}',
                'summary': {
                    'rows_processed': len(df),
                    'columns': len(df.columns)
                }
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Processing failed',
                'message': str(e)
            })
        }
```

### Go - Alta Performance

```go
// functions/image-resizer/main.go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"net/http"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/disintegration/imaging"
)

type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

type ResizeRequest struct {
	ImageURL string `json:"image_url"`
	Width    int    `json:"width"`
	Height   int    `json:"height"`
	Quality  int    `json:"quality"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	// Parse request
	var req ResizeRequest
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return Response{
			StatusCode: 400,
			Body:       `{"error": "Invalid JSON"}`,
		}, nil
	}

	// Download image
	resp, err := http.Get(req.ImageURL)
	if err != nil {
		return Response{
			StatusCode: 400,
			Body:       fmt.Sprintf(`{"error": "Failed to download image: %s"}`, err.Error()),
		}, nil
	}
	defer resp.Body.Close()

	// Decode image
	var img image.Image
	contentType := resp.Header.Get("Content-Type")
	
	switch {
	case strings.Contains(contentType, "jpeg"):
		img, err = jpeg.Decode(resp.Body)
	case strings.Contains(contentType, "png"):
		img, err = imaging.Decode(resp.Body)
	default:
		return Response{
			StatusCode: 400,
			Body:       `{"error": "Unsupported image format"}`,
		}, nil
	}
	
	if err != nil {
		return Response{
			StatusCode: 500,
			Body:       fmt.Sprintf(`{"error": "Failed to decode image: %s"}`, err.Error()),
		}, nil
	}

	// Resize image
	resized := imaging.Resize(img, req.Width, req.Height, imaging.Lanczos)

	// Encode to bytes
	var buf strings.Builder
	if strings.Contains(contentType, "png") {
		err = png.Encode(&buf, resized)
	} else {
		err = jpeg.Encode(&buf, resized, &jpeg.Options{Quality: req.Quality})
	}
	
	if err != nil {
		return Response{
			StatusCode: 500,
			Body:       fmt.Sprintf(`{"error": "Failed to encode image: %s"}`, err.Error()),
		}, nil
	}

	return Response{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": contentType,
			"Cache-Control": "public, max-age=31536000",
		},
		Body: buf.String(),
	}, nil
}

func main() {
	lambda.Start(handler)
}
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

```bash
# Definir variáveis para função específica
xcloud functions env add minha-api DATABASE_URL "postgres://..."

# Variáveis secretas (criptografadas)
xcloud functions env add minha-api API_SECRET "secret123" --secret

# Importar de arquivo
xcloud functions env import minha-api .env.production
```

### Triggers e Eventos

```json
// xcloud-function.json
{
  "triggers": [
    {
      "type": "http",
      "path": "/api/webhook",
      "methods": ["POST"]
    },
    {
      "type": "schedule",
      "expression": "cron(0 2 * * ? *)",
      "description": "Daily cleanup at 2 AM"
    },
    {
      "type": "s3",
      "bucket": "my-uploads",
      "events": ["s3:ObjectCreated:*"]
    },
    {
      "type": "database",
      "table": "users",
      "events": ["INSERT", "UPDATE"]
    }
  ]
}
```

### Configuração de Recursos

```json
{
  "resources": {
    "memory": 1024,
    "timeout": 300,
    "concurrency": 100,
    "reservedConcurrency": 10
  },
  "networking": {
    "vpc": "vpc-12345678",
    "subnets": ["subnet-12345", "subnet-67890"],
    "securityGroups": ["sg-12345"]
  }
}
```

## 📊 Monitoramento e Debugging

### Logs em Tempo Real

```bash
# Logs de função específica
xcloud functions logs minha-api --follow

# Filtrar por nível
xcloud functions logs minha-api --level error

# Buscar por padrão
xcloud functions logs minha-api --grep "payment"
```

### Métricas

```bash
# Métricas de performance
xcloud functions metrics minha-api

# Métricas detalhadas
xcloud functions metrics minha-api --detailed --since 24h
```

### Testing Local

```bash
# Executar função localmente
xcloud functions dev minha-api

# Testar com payload específico
xcloud functions invoke minha-api --data '{"test": true}'

# Debug mode
xcloud functions dev minha-api --debug
```

## 🎯 Padrões e Melhores Práticas

### 1. Estrutura de Projeto

```
functions/
├── shared/                 # Código compartilhado
│   ├── db.js              # Conexões banco
│   ├── auth.js            # Autenticação
│   └── utils.js           # Utilitários
├── user-api/              # Função API usuários
│   ├── index.js
│   ├── package.json
│   └── xcloud-function.json
├── image-processor/       # Processamento imagens
│   ├── main.py
│   ├── requirements.txt
│   └── xcloud-function.json
└── scheduled-tasks/       # Tarefas agendadas
    ├── cleanup.js
    └── xcloud-function.json
```

### 2. Tratamento de Erros

```javascript
// Padrão de response consistente
export default async function handler(event, context) {
  try {
    // Lógica da função
    const result = await processData(event.body);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        requestId: context.requestId
      })
    };
  }
}
```

### 3. Otimização de Performance

```javascript
// Connection pooling para banco de dados
let dbConnection = null;

export default async function handler(event, context) {
  // Reutilizar conexão entre invocações
  if (!dbConnection) {
    dbConnection = await createConnection();
  }
  
  // Lógica da função
  const result = await dbConnection.query(sql, params);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

// Cleanup na finalização do container
process.on('SIGTERM', () => {
  if (dbConnection) {
    dbConnection.close();
  }
});
```

### 4. Validação de Input

```javascript
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
  age: Joi.number().integer().min(0).max(150)
});

export default async function handler(event, context) {
  // Validar dados de entrada
  const { error, value } = schema.validate(JSON.parse(event.body));
  
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Validation failed',
        details: error.details
      })
    };
  }
  
  // Processar dados válidos
  const result = await createUser(value);
  
  return {
    statusCode: 201,
    body: JSON.stringify(result)
  };
}
```

## 🚀 Deploy e Versionamento

### Deploy Strategies

```bash
# Deploy básico
xcloud functions deploy minha-api

# Deploy com alias
xcloud functions deploy minha-api --alias production

# Deploy canário (gradual)
xcloud functions deploy minha-api --canary 10

# Rollback
xcloud functions rollback minha-api --to-version v1.2.3
```

### Ambientes

```bash
# Deploy para staging
xcloud functions deploy minha-api --env staging

# Promover staging para produção
xcloud functions promote minha-api staging production

# Configurar pipeline
xcloud functions pipeline create minha-api \
  --stages "test,staging,production" \
  --auto-promote
```

## 📈 Scaling e Limites

### Configuração de Auto-scaling

```json
{
  "scaling": {
    "minInstances": 0,
    "maxInstances": 1000,
    "targetUtilization": 70,
    "scaleUpCooldown": 30,
    "scaleDownCooldown": 300
  }
}
```

### Limites por Plano

| Recurso | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Execuções/mês | 1M | 10M | Ilimitado |
| Duração máxima | 30s | 15min | 1h |
| Memória máxima | 1GB | 8GB | 32GB |
| Funções simultâneas | 10 | 100 | 1000 |

## 🎉 Próximos Passos

Agora que você domina funções serverless:

1. **Integrar com Banco de Dados** - Use variáveis de ambiente para configurar conexões
2. **Configurar Autenticação** - Implementar JWT e OAuth2
3. **Implementar WebSockets** - Para comunicação em tempo real
4. **[Otimizar Performance](./xcloud-cli-guia-completo.md)** - Use o guia da CLI

---

⚡ **Suas funções serverless estão prontas para escalar infinitamente na xCloud Platform!**