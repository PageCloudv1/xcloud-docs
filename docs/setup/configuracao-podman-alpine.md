# 🏔️ Configuração Podman + Alpine Linux

## 📋 Visão Geral

O xCloud Platform utiliza **Podman** com **Alpine Linux** para testes locais de GitHub Actions, garantindo uso mínimo de recursos e máxima eficiência.

## 🎯 Benefícios da Configuração

### **🏔️ Alpine Linux**

- **Tamanho**: 5-10MB vs Ubuntu 80MB (90% menos espaço)
- **Performance**: Boot e execução mais rápidos
- **Segurança**: Menor superfície de ataque
- **Eficiência**: Otimizado para containers

### **🧠 Limites de Recursos**

- **Memória**: Máximo 256MB por container
- **CPU**: Máximo 0.5 cores por container
- **Validação rápida**: 128MB RAM, 0.25 CPU
- **Testes completos**: 256MB RAM, 0.5 CPU

## 🛠️ Setup Automático

### **Via VS Code Task**

1. `Ctrl+Shift+P` → `Tasks: Run Task`
2. Selecione `🏔️ Configure Podman (Alpine + Minimal Resources)`
3. Aguarde o download das imagens Alpine

### **Via Linha de Comando**

```bash
node scripts/configure-podman.js
```

## 📦 Imagens Alpine Configuradas

| Linguagem | Imagem Alpine | Tamanho Aprox. |
|-----------|---------------|----------------|
| Base | `alpine:latest` | ~5MB |
| Node.js 18 | `node:18-alpine` | ~40MB |
| Node.js 20 | `node:20-alpine` | ~42MB |
| Python 3.9 | `python:3.9-alpine` | ~25MB |
| Python 3.10 | `python:3.10-alpine` | ~27MB |
| Python 3.11 | `python:3.11-alpine` | ~29MB |
| Go 1.21 | `golang:1.21-alpine` | ~35MB |

## ⚙️ Arquivos de Configuração

### **`.actrc`** - Configuração do Act

```bash
# Act configuration for xCloud Platform
--container-daemon-socket ""
--container-architecture linux/amd64
--container-options "--runtime=podman --memory=256m --cpus=0.5"
-P ubuntu-latest=alpine:latest
-P node:18=node:18-alpine
-P python:3.9=python:3.9-alpine
```

### **`.podman-containers.conf`** - Limites do Podman

```toml
[containers]
default_ulimits = ["nofile=1024:2048"]
memory = "256m"
cpus = "0.5"

[engine]
runtime = "podman"

[network]
network_backend = "netavark"
```

## 🧪 Testes com Recursos Limitados

### **Teste Rápido (Validação de Sintaxe)**

- **Comando**: `node tests/test-workflows.js --quick-test`
- **Recursos**: 128MB RAM, 0.25 CPU
- **Tempo**: ~30 segundos para todos os repos

### **Teste Completo**

- **Comando**: `node tests/test-workflows.js --no-dry-run`
- **Recursos**: 256MB RAM, 0.5 CPU
- **Tempo**: ~5-10 minutos para todos os repos

### **Teste Repositório Específico**

- **Comando**: `node tests/test-workflows.js -r xcloud-cli`
- **Recursos**: 256MB RAM, 0.5 CPU
- **Tempo**: ~1-2 minutos por repo

## 🔧 Comandos Úteis

### **Verificar Imagens Baixadas**

```bash
podman images | grep alpine
```

### **Monitorar Recursos**

```bash
podman stats
```

### **Limpar Cache (se necessário)**

```bash
podman system prune -f
```

## 📊 Comparação de Recursos

| Aspecto | Podman + Ubuntu | Podman + Alpine | Economia |
|---------|----------------|-----------------|----------|
| Imagem base | 80MB | 5MB | 94% |
| Node.js | 200MB | 40MB | 80% |
| Python | 150MB | 25MB | 83% |
| Golang | 180MB | 35MB | 81% |
| RAM uso | Sem limite | 256MB max | Controlado |
| CPU uso | Sem limite | 0.5 cores max | Controlado |

## ⚠️ Troubleshooting

### **Problema: Act não encontra jobs**

**Solução**: Verificar se o workflow existe no repositório

```bash
ls PageCloudv1-repos/xcloud-cli/.github/workflows/
```

### **Problema: Podman não responde**

**Solução**: Reiniciar serviço do Podman

```bash
podman system service --time=0 &
```

### **Problema: Falta de memória**

**Solução**: Aumentar limite temporariamente

```bash
act --container-options "--runtime=podman --memory=512m"
```

## 🚀 Próximos Passos

1. **Execute o setup**: `node scripts/configure-podman.js`
2. **Teste a configuração**: `node tests/test-workflows.js --quick-test`
3. **Monitore recursos**: `podman stats` durante execução
4. **Otimize conforme necessário**: Ajustar limites em `.actrc`

## 📚 Referências

- [Podman Documentation](https://docs.podman.io/)
- [Alpine Linux](https://alpinelinux.org/)
- [Act - GitHub Actions Local Testing](https://github.com/nektos/act)
- [Container Resource Management](https://docs.podman.io/en/latest/markdown/podman-run.1.html#resource-options)

---

**🌩️ xCloud Platform**: Uso mínimo de recursos, máxima eficiência!
