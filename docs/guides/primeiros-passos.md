# 🚀 Primeiros Passos - Deploy do Zero

Este guia irá te acompanhar desde a instalação da xCloud CLI até o seu primeiro deploy em produção. Em menos de 10 minutos, você terá sua primeira aplicação rodando na xCloud Platform.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:
- **Node.js 18+** instalado ([nodejs.org](https://nodejs.org))
- **Git** configurado
- Uma conta na **xCloud Platform** ([xcloud.io](https://xcloud.io))

## 🎯 Passo 1: Instalação da xCloud CLI

A CLI é a ferramenta principal para interagir com a plataforma xCloud.

### Via npm (Recomendado)

```bash
npm install -g xcloud-cli
```

### Via Homebrew (macOS/Linux)

```bash
brew install xcloud-cli
```

### Verificar instalação

```bash
xcloud --version
# Deve mostrar a versão instalada, ex: xcloud/2.1.0
```

## 🔐 Passo 2: Autenticação

Faça login na sua conta xCloud:

```bash
xcloud login
```

Isso abrirá seu navegador para autenticação. Após o login, você verá uma confirmação no terminal.

## 🏗️ Passo 3: Criar seu Primeiro Projeto

Vamos criar uma aplicação Next.js do zero:

```bash
# Criar um novo projeto
xcloud init minha-primeira-app --template nextjs

# Entrar no diretório
cd minha-primeira-app
```

### O que foi criado?

```
minha-primeira-app/
├── pages/              # Páginas da aplicação
├── components/         # Componentes reutilizáveis
├── styles/             # Estilos CSS
├── public/             # Arquivos estáticos
├── package.json        # Dependências
└── xcloud.json         # Configuração xCloud
```

## 🔧 Passo 4: Desenvolvimento Local

Inicie o servidor de desenvolvimento:

```bash
xcloud dev
```

🎉 **Sua aplicação está rodando em `http://localhost:3000`!**

### Fazendo alterações

Edite `pages/index.js` para personalizar sua página inicial:

```jsx
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Minha Primeira App na xCloud! 🚀</h1>
      <p>Deploy feito com sucesso!</p>
    </div>
  )
}
```

Salve o arquivo e veja as mudanças aparecerem automaticamente no navegador.

## 🌍 Passo 5: Primeiro Deploy (Preview)

Agora vamos fazer o deploy para um ambiente de preview:

```bash
xcloud deploy
```

Após alguns segundos, você receberá:
- ✅ **URL de Preview**: `https://minha-primeira-app-git-main-a1b2c3d4.xcloud.dev`
- 📊 **Dashboard**: Link para monitorar sua aplicação

### Testando sua aplicação

1. Acesse a URL fornecida
2. Teste todas as funcionalidades
3. Compartilhe com sua equipe para feedback

## 🎯 Passo 6: Deploy em Produção

Quando estiver satisfeito com o resultado, faça o deploy para produção:

```bash
xcloud deploy --prod
```

Sua aplicação estará disponível em:
- 🌐 **URL de Produção**: `https://minha-primeira-app.xcloud.app`

## 🔧 Passo 7: Configurações Avançadas

### Variáveis de Ambiente

```bash
# Adicionar uma variável
xcloud env add API_URL "https://api.example.com"

# Adicionar um segredo (criptografado)
xcloud env add DATABASE_URL "postgres://..." --secret

# Listar variáveis
xcloud env ls
```

### Visualizar Logs

```bash
# Logs em tempo real
xcloud logs --follow

# Logs de uma função específica
xcloud logs --function api
```

### Monitoramento

```bash
# Status da aplicação
xcloud status

# Métricas de performance
xcloud metrics
```

## 🎉 Parabéns! Primeiro Deploy Concluído

Você acaba de:
- ✅ Instalar e configurar a xCloud CLI
- ✅ Criar sua primeira aplicação
- ✅ Fazer deploy em preview e produção
- ✅ Aprender comandos essenciais

## 🔥 Próximos Passos

Agora que você tem sua primeira aplicação rodando, explore mais recursos:

1. **[Configurar Domínio Customizado](./dominio-customizado.md)** - Use seu próprio domínio
2. **[Guia Detalhado da CLI](./xcloud-cli-guia-completo.md)** - Explore todos os comandos
3. **[Funções Serverless](./funcoes-serverless.md)** - Adicione backend à sua app
4. **[Templates Avançados](../templates/)** - Explore outros templates disponíveis

## 🆘 Precisa de Ajuda?

- 📚 **Documentação**: [docs.xcloud.io](https://docs.xcloud.io)
- 💬 **Discord**: [discord.gg/xcloud](https://discord.gg/xcloud)  
- 🐛 **Issues**: [github.com/PageCloudv1/xcloud-platform/issues](https://github.com/PageCloudv1/xcloud-platform/issues)

---

**🏆 Dica Pro**: Use `xcloud --help` ou `xcloud <comando> --help` para ver todas as opções disponíveis de qualquer comando!