# xCloud CLI - Introdução 🚀

A **xCloud CLI** é uma ferramenta de linha de comando poderosa que permite gerenciar seus projetos na plataforma xCloud de forma rápida e eficiente. Com ela, você pode inicializar novos projetos, fazer deploys, gerenciar domínios, visualizar logs e muito mais.

## 🎯 O que é a xCloud CLI?

A xCloud CLI é o ponto de entrada para a plataforma xCloud, oferecendo uma interface de linha de comando intuitiva e poderosa para desenvolvedores. Ela foi projetada para simplificar o processo de desenvolvimento, deploy e gerenciamento de aplicações modernas.

### Principais benefícios:

- ⚡ **Deploy em segundos** - Faça deploy de qualquer aplicação com um único comando
- 🎨 **Templates prontos** - Inicie projetos rapidamente com templates otimizados
- 🔄 **Desenvolvimento local** - Ambiente de desenvolvimento integrado
- 📊 **Monitoramento** - Visualize logs e métricas em tempo real
- 🌐 **Gerenciamento de domínios** - Configure domínios customizados facilmente
- ⚙️ **Variáveis de ambiente** - Gerencie configurações de forma segura

## 📋 Comandos Principais

### `xcloud init`
Cria um novo projeto a partir de templates otimizados.

```bash
# Criar um novo projeto
xcloud init my-project

# Usar um template específico
xcloud init my-next-app --template nextjs
```

### `xcloud deploy`
Faz deploy da sua aplicação para a plataforma xCloud.

```bash
# Deploy para ambiente de preview
xcloud deploy

# Deploy para produção
xcloud deploy --prod
```

### `xcloud dev`
Inicia o servidor de desenvolvimento local com hot reload.

```bash
# Iniciar servidor local
xcloud dev

# Seu app estará disponível em http://localhost:3000
```

### `xcloud logs`
Visualiza logs de builds e execução da aplicação.

```bash
# Ver logs do último deploy
xcloud logs

# Ver logs de um deploy específico
xcloud logs [deployment-url]
```

### `xcloud domains`
Gerencia domínios customizados para seus projetos.

```bash
# Listar domínios
xcloud domains ls

# Adicionar um novo domínio
xcloud domains add www.meusite.com
```

### `xcloud env`
Gerencia variáveis de ambiente de forma segura.

```bash
# Listar variáveis de ambiente
xcloud env ls

# Adicionar uma variável
xcloud env add API_URL "https://api.example.com"

# Adicionar um segredo (criptografado)
xcloud env add DATABASE_URL "postgres://..." --secret
```

## 🚀 Exemplo Prático

Vamos criar e fazer deploy de uma aplicação Next.js em menos de 2 minutos:

```bash
# 1. Instalar a CLI (se ainda não tiver)
npm install -g xcloud-cli

# 2. Criar um novo projeto Next.js
xcloud init minha-app --template nextjs
cd minha-app

# 3. Desenvolver localmente
xcloud dev

# 4. Fazer deploy quando estiver pronto
xcloud deploy
```

🎉 **Pronto!** Sua aplicação estará no ar em segundos.

## 📚 Próximos Passos

- Explore mais templates disponíveis com `xcloud init --help`
- Configure seu primeiro domínio customizado
- Aprenda sobre funções serverless e variáveis de ambiente
- Confira nossos guias de desenvolvimento avançado

---

**💡 Dica:** Use `xcloud --help` ou `xcloud <comando> --help` para ver todas as opções disponíveis para cada comando.