# 🌐 Configurando um Domínio Customizado

Este tutorial te guiará passo a passo para configurar seu próprio domínio na xCloud Platform, desde a compra do domínio até a configuração completa com SSL.

## 🎯 O que vamos configurar

Ao final deste tutorial, você terá:
- ✅ Seu domínio personalizado apontando para sua aplicação
- ✅ Certificado SSL automático (HTTPS)
- ✅ Redirecionamentos configurados
- ✅ Monitoramento de DNS ativo

## 📋 Pré-requisitos

- Aplicação já deployada na xCloud
- Domínio registrado (ou acesso para configurar DNS)
- xCloud CLI instalada e autenticada

## 🏷️ Passo 1: Preparação do Domínio

### Se você ainda não tem um domínio

Recomendamos estes provedores confiáveis:
- **Namecheap** - Fácil de usar, preços competitivos
- **Cloudflare** - Integração nativa com CDN
- **Google Domains** - Interface simples do Google

### Se você já tem um domínio

Certifique-se de ter acesso ao painel de controle DNS do seu provedor.

## 🔧 Passo 2: Adicionar Domínio na xCloud

### Usando a CLI

```bash
# Listar seus projetos
xcloud projects list

# Adicionar domínio ao projeto
xcloud domains add www.meusite.com

# Para subdomínio específico
xcloud domains add api.meusite.com

# Para ambiente específico
xcloud domains add staging.meusite.com --env staging
```

### Verificar configuração necessária

```bash
# Ver registros DNS necessários
xcloud domains dns-config www.meusite.com
```

Você verá algo como:

```
📋 Configuração DNS necessária:

CNAME Records:
www.meusite.com → cname.xcloud.app
api.meusite.com → cname.xcloud.app

A Records (alternativo):
meusite.com → 198.51.100.1
www.meusite.com → 198.51.100.1

TXT Record (verificação):
_xcloud-verify.meusite.com → xcloud-verification-abc123def456
```

## 🌍 Passo 3: Configurar DNS

### Opção 1: CNAME (Recomendado)

**Vantagens**: Automático, sem manutenção
**Melhor para**: Subdomínios (www, api, app, etc.)

No seu provedor DNS:

```
Tipo: CNAME
Nome: www
Valor: cname.xcloud.app
TTL: 300 (ou automático)
```

### Opção 2: A Record

**Vantagens**: Funciona para domínio raiz
**Melhor para**: Domínio principal sem www

```
Tipo: A
Nome: @
Valor: 198.51.100.1
TTL: 300
```

### Registro de Verificação

**Obrigatório para ativar o domínio:**

```
Tipo: TXT
Nome: _xcloud-verify
Valor: xcloud-verification-abc123def456
TTL: 300
```

## 🔍 Passo 4: Verificar Configuração

### Aguardar Propagação DNS

A propagação DNS pode levar de 5 minutos a 24 horas. Normalmente é rápida (5-15 min).

### Verificar via CLI

```bash
# Verificar se DNS está configurado
xcloud domains check-dns www.meusite.com

# Verificar propagação global
xcloud domains propagation www.meusite.com
```

### Verificar manualmente

```bash
# Linux/macOS
dig www.meusite.com CNAME
nslookup www.meusite.com

# Windows
nslookup www.meusite.com
```

## ✅ Passo 5: Ativar Domínio

### Verificar e ativar

```bash
# Verificar configuração
xcloud domains verify www.meusite.com

# Se tudo estiver correto, ativar
xcloud domains activate www.meusite.com
```

### Status do domínio

```bash
# Ver status de todos os domínios
xcloud domains list

# Status detalhado de um domínio
xcloud domains status www.meusite.com
```

## 🔒 Passo 6: Configurar SSL (Automático)

A xCloud gera certificados SSL automaticamente. O processo:

1. **Verificação de domínio** - Confirma que você controla o domínio
2. **Geração do certificado** - Cria certificado SSL via Let's Encrypt
3. **Instalação** - Configura HTTPS automaticamente
4. **Renovação** - Renova automaticamente a cada 60 dias

### Verificar SSL

```bash
# Status do certificado SSL
xcloud domains ssl-status www.meusite.com

# Forçar renovação do certificado (se necessário)
xcloud domains ssl-renew www.meusite.com
```

## 🎛️ Passo 7: Configurações Avançadas

### Redirecionamentos

```bash
# Redirecionar domínio sem www para com www
xcloud domains redirect meusite.com www.meusite.com --permanent

# Redirecionar HTTP para HTTPS (automático por padrão)
xcloud domains force-https www.meusite.com
```

### Subdomínios Múltiplos

```bash
# Adicionar vários subdomínios
xcloud domains add app.meusite.com
xcloud domains add api.meusite.com  
xcloud domains add admin.meusite.com

# Wildcard subdomain (planos Pro+)
xcloud domains add "*.meusite.com" --wildcard
```

### Headers Personalizados

Adicione no arquivo `xcloud.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📊 Passo 8: Monitoramento e Manutenção

### Configurar Monitoramento

```bash
# Ativar monitoramento de uptime
xcloud domains monitor www.meusite.com --enable

# Configurar alertas
xcloud domains alerts www.meusite.com --email seuemail@example.com

# Verificar métricas
xcloud domains metrics www.meusite.com
```

### Dashboard Web

Acesse o dashboard em `https://dashboard.xcloud.io` para:
- 📊 Ver métricas de tráfego
- 🔍 Analisar performance
- ⚡ Configurar CDN
- 🛡️ Gerenciar firewall

## 🔄 Casos Especiais

### Domínio com Cloudflare

Se você usa Cloudflare como DNS:

1. **Desativar proxy** (nuvem cinza) durante configuração inicial
2. **Configurar CNAME** conforme instruções
3. **Reativar proxy** após verificação
4. **Configurar SSL** no Cloudflare como "Full"

```bash
# Verificar compatibilidade com Cloudflare
xcloud domains cloudflare-check www.meusite.com
```

### Migração de Domínio Existente

```bash
# Verificar configuração atual
xcloud domains analyze www.meusite.com

# Migrar gradualmente
xcloud domains migrate www.meusite.com --gradual

# Rollback se necessário
xcloud domains rollback www.meusite.com
```

### Múltiplos Ambientes

```bash
# Produção
xcloud domains add www.meusite.com --env production

# Staging  
xcloud domains add staging.meusite.com --env staging

# Development
xcloud domains add dev.meusite.com --env development
```

## 🐛 Solução de Problemas

### Problemas Comuns

#### DNS não propaga
```bash
# Limpar cache DNS local
xcloud domains flush-dns www.meusite.com

# Verificar em servidores globais
xcloud domains global-check www.meusite.com
```

#### SSL não funciona
```bash
# Verificar certificado
xcloud domains ssl-debug www.meusite.com

# Forçar nova emissão
xcloud domains ssl-reissue www.meusite.com
```

#### Domínio não carrega
```bash
# Diagnóstico completo
xcloud domains diagnose www.meusite.com

# Verificar configuração do app
xcloud status --domains
```

### Logs de Debug

```bash
# Logs de configuração de domínio
xcloud logs --filter domain --grep www.meusite.com

# Logs de SSL
xcloud logs --filter ssl --since 1h
```

## ✅ Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] **DNS configurado** - Registros CNAME/A adicionados
- [ ] **Verificação TXT** - Registro de verificação adicionado  
- [ ] **Propagação DNS** - Comando `dig` retorna configuração correta
- [ ] **Domínio ativado** - Status "Active" na CLI
- [ ] **SSL funcionando** - Site carrega com HTTPS
- [ ] **Redirecionamentos** - HTTP redireciona para HTTPS
- [ ] **Monitoramento** - Alertas configurados

### Teste Final

```bash
# Teste completo automatizado
xcloud domains test www.meusite.com --complete

# Verificar performance
xcloud domains speed-test www.meusite.com
```

## 🚀 Próximos Passos

Agora que seu domínio está configurado:

1. **Configure CDN** para melhor performance
2. **Setup Analytics** para monitorar tráfego  
3. **Configure WAF** para proteção adicional
4. **[Explore outras funcionalidades](./xcloud-cli-guia-completo.md)** da xCloud CLI

## 💡 Dicas Avançadas

### Performance

```bash
# Ativar compressão
xcloud domains compression www.meusite.com --enable

# Cache otimizado
xcloud domains cache www.meusite.com --profile static-app

# HTTP/2 e HTTP/3
xcloud domains http3 www.meusite.com --enable
```

### SEO

```bash
# Configurar canonical URLs
xcloud domains canonical www.meusite.com

# Sitemap automático
xcloud domains sitemap www.meusite.com --auto-generate
```

---

🎉 **Parabéns!** Seu domínio personalizado está configurado e funcionando perfeitamente na xCloud Platform!