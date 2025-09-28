# xCloud Platform - Guia do Desenvolvedor 🚀

Bem-vindo à xCloud! Este guia irá ajudá-lo a fazer o deploy da sua primeira aplicação em minutos.

## 🎯 Início Rápido

### Instalação do CLI

```bash
npm install -g xcloud-cli
```

### Seu Primeiro Deploy em 30 Segundos

```bash
# 1. Crie um arquivo HTML simples
echo "<h1>Olá, xCloud!</h1>" > index.html

# 2. Faça o deploy
xcloud

# Responda às perguntas:
# ✓ Path do projeto: (current directory)
# ✓ Nome do projeto: my-first-site
# ✓ Framework: Other
# ✓ Build command: (nenhum)
# ✓ Output directory: .
# ✓ Fazer deploy agora? Yes

# 🎉 Pronto! Sua aplicação está no ar.
# 🔗 Preview: https://my-first-site-a1b2c3d4.xcloud.dev
```

## 📚 Tutorial Completo: Deploy de uma Aplicação Next.js

### Passo 1: Crie um Novo Projeto Next.js

```bash
# Use o CLI da xCloud para iniciar um projeto com um template
xcloud init my-next-app --template nextjs

# Ou use o create-next-app
# npx create-next-app@latest my-next-app

cd my-next-app
```

### Passo 2: Desenvolva Localmente

```bash
# Inicie o servidor de desenvolvimento local
xcloud dev

# Seu app estará rodando em http://localhost:3000
```

### Passo 3: Configure seu Projeto (Opcional)

O CLI da xCloud detecta as configurações automaticamente. Um arquivo `xcloud.json` será criado:

```json
{
  "name": "my-next-app",
  "framework": "nextjs",
  "build": {
    "command": "npm run build",
    "outputDir": ".next"
  }
}
```

### Passo 4: Faça o Deploy para um Ambiente de Preview

```bash
# Faça o deploy a partir da raiz do seu projeto
xcloud

# O CLI irá detectar o framework, construir e fazer o deploy.
# Ao final, você receberá uma URL de preview única para cada deploy.
# 🔗 Preview: https://my-next-app-git-main-a1b2c3d4.xcloud.dev
```

### Passo 5: Deploy para Produção

```bash
# Para fazer o deploy no seu domínio principal
xcloud deploy --prod
```

### Passo 6: Adicione um Domínio Customizado

```bash
# Mapeie seu domínio para o projeto
xcloud domains add www.meusite.com

# Siga as instruções para atualizar seus registros DNS.
```

## 🔥 Funcionalidades Avançadas

### Funções Serverless

1.  Crie uma função na pasta `api/`:

    ```javascript
    // api/hello.js
    export default function handler(req, res) {
      const { name = 'Mundo' } = req.query;
      res.status(200).send(`Olá, ${name}!`);
    }
    ```

2.  Faça o deploy com `xcloud`. A função estará disponível em `/api/hello`.

### Variáveis de Ambiente

```bash
# Adicione uma variável de ambiente
xcloud env add API_URL "https://api.example.com"

# Adicione um segredo (será criptografado)
xcloud env add DATABASE_URL "postgres://..." --secret

# Liste as variáveis
xcloud env ls
```

### Usando o Marketplace de Componentes

```bash
# Procure por componentes
xcloud search button

# Adicione um componente ao seu projeto
xcloud component add @xcloud/ui-button
```

## 🎮 Referência de Comandos do CLI

```bash
# Gerenciamento de Projetos
xcloud init                    # Criar um novo projeto a partir de um template
xcloud dev                     # Iniciar o servidor de desenvolvimento local
xcloud deploy                  # Fazer deploy para um ambiente de preview
xcloud deploy --prod           # Fazer deploy para produção
xcloud list                    # Listar todos os seus projetos

# Funções e Logs
xcloud functions list          # Listar funções serverless
xcloud logs [deployment-url]   # Ver logs de um deploy específico

# Domínios e Ambiente
xcloud domains ls              # Listar domínios
xcloud domains add <domain>    # Adicionar um domínio customizado
xcloud env ls                  # Listar variáveis de ambiente
xcloud env add <key> <value>   # Adicionar uma variável de ambiente

# Templates & Componentes
xcloud template list           # Listar templates disponíveis
xcloud component add <name>    # Adicionar um componente ao projeto
```

## 🆘 Obtendo Ajuda

- **Documentação**: [docs.xcloud.io](https://docs.xcloud.io)
- **Discord**: [discord.gg/xcloud](https://discord.gg/xcloud)
- **GitHub Issues**: Para reportar bugs ou solicitar funcionalidades.

## 🐛 Solução de Problemas

### Problemas Comuns

**Problema**: Build falha.
```bash
# Verifique os logs do build
xcloud logs <url-do-deploy-com-falha>

# Rode o comando de build localmente para depurar
npm run build
```

**Problema**: Dependências não são instaladas corretamente.
```bash
# Remova node_modules e reinstale
rm -rf node_modules && npm install

# Verifique se o `package-lock.json` está atualizado
```

---

<div align="center">

**Happy Deploying! 🚀**

Junte-se à nossa comunidade: [Discord](https://discord.gg/xcloud)

</div>
