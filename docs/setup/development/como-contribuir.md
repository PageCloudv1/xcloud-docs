# Contribuindo para a xCloud Platform 🚀

Obrigado pelo interesse em contribuir com a xCloud Platform! Este documento fornece diretrizes e informações sobre como contribuir efetivamente para o projeto.

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Contribuir](#-como-contribuir)
- [Configuração do Ambiente](#-configuração-do-ambiente)
- [Processo de Desenvolvimento](#-processo-de-desenvolvimento)
- [Padrões de Código](#-padrões-de-código)
- [Testes](#-testes)
- [Documentação](#-documentação)
- [Pull Requests](#-pull-requests)
- [Reportar Bugs](#-reportar-bugs)
- [Solicitar Funcionalidades](#-solicitar-funcionalidades)
- [Contribuição com Componentes/Templates](#-contribuição-com-componentes-e-templates)
- [Comunidade e Suporte](#-comunidade-e-suporte)

## 🤝 Código de Conduta

Este projeto segue o [Código de Conduta](codigo-de-conduta.md). Ao participar, você deve aderir a essas diretrizes.

## 🌟 Como Contribuir

Existem várias formas de contribuir com a xCloud Platform:

### 🐛 Reportando Bugs
- Use o [template de bug report](.github/ISSUE_TEMPLATE/bug_report.md).
- Forneça informações detalhadas sobre o ambiente.
- Inclua passos para reproduzir o problema.

### ✨ Sugerindo Funcionalidades
- Use o [template de feature request](.github/ISSUE_TEMPLATE/feature_request.md).
- Descreva o caso de uso e os benefícios.
- Considere a compatibilidade com a arquitetura existente.

### 💻 Contribuindo com Código
- Correção de bugs.
- Implementação de novas funcionalidades na plataforma.
- Melhoria na performance do build ou deploy.
- Refatoração de código.

### 📚 Contribuindo com Documentação
- Melhoria da documentação existente.
- Criação de tutoriais e guias.
- Tradução para outros idiomas.
- Exemplos de código.

### 📦 Criando Componentes e Templates
- Desenvolvimento de templates de aplicações (e.g., Next.js, FastAPI).
- Criação de componentes de UI reutilizáveis.
- Plugins para integrações com serviços de terceiros.
- Funções serverless úteis.

## ⚙️ Configuração do Ambiente

### Pré-requisitos

```bash
# Python 3.9+
python --version

# Node.js 18+
node --version

# Git
git --version

# Podman (runtime de containers)
podman --version
```

### Setup Inicial

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU_USERNAME/xcloud-platform.git
cd xcloud-platform

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/PageCloudv1/xcloud-platform.git

# 4. Crie um ambiente virtual Python
python -m venv venv
source venv/bin/activate  # Linux/macOS
# ou
venv\Scripts\activate     # Windows

# 5. Instale dependências de desenvolvimento
pip install -r requirements-dev.txt
npm install

# 6. Instale hooks do pre-commit
pre-commit install
```

## 🔄 Processo de Desenvolvimento

### Fluxo de Trabalho Git

```bash
# 1. Atualize seu fork
git fetch upstream
git checkout main
git merge upstream/main

# 2. Crie uma branch para sua feature
git checkout -b feature/nome-da-feature

# 3. Faça suas alterações
# ... código ...

# 4. Execute testes
pytest
npm test

# 5. Commit suas mudanças
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# 6. Push para seu fork
git push origin feature/nome-da-feature

# 7. Abra um Pull Request no GitHub
```

### Tipos de Commit

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nova funcionalidade
fix: correção de bug
docs: mudanças na documentação
style: formatação, sem mudança de código
refactor: refatoração de código
test: adição ou correção de testes
chore: tarefas de manutenção (build, CI/CD)
```

## 📏 Padrões de Código

### Estilo Python

Seguimos o [PEP 8](https://pep8.org/) e usamos `black` e `isort` para formatação.

```python
# Use type hints sempre
from typing import List, Dict, Optional

# Docstrings no formato Google
def process_build_logs(logs: List[str]) -> Dict[str, int]:
    """
    Analisa os logs de build e retorna um sumário.
    
    Args:
        logs: Uma lista de linhas de log.
        
    Returns:
        Um dicionário com a contagem de erros e avisos.
    """
    summary = {"errors": 0, "warnings": 0}
    for line in logs:
        if "error" in line.lower():
            summary["errors"] += 1
        if "warning" in line.lower():
            summary["warnings"] += 1
    return summary
```

### Formatação e Linting

```bash
# Formatação automática
black .
isort .

# Verificação de código
flake8 .
mypy .
```

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── unit/                    # Testes unitários
│   ├── test_build_pipeline.py
│   └── test_deploy_engine.py
├── integration/             # Testes de integração
│   ├── test_api.py
│   └── test_cli.py
└── fixtures/                # Dados para testes
    ├── sample-project.zip
    └── mock_api_responses.py
```

### Escrevendo Testes

```python
import pytest
from xcloud.core.build import BuildPipeline

async def test_build_pipeline_execution(sample_project):
    """Testa a execução de um pipeline de build simples."""
    # Arrange
    pipeline = BuildPipeline(context={"project_path": sample_project})
    pipeline.add_step(InstallDependenciesStep())
    pipeline.add_step(RunBuildCommandStep())
    
    # Act
    artifacts = await pipeline.execute()
    
    # Assert
    assert "output_dir" in artifacts
    assert (sample_project / "dist").exists()
```

### Executando Testes

```bash
# Todos os testes Python
pytest

# Com coverage
pytest --cov=xcloud --cov-report=html

# Testes JavaScript (se houver)
npm test
```

## 📚 Documentação

A documentação é gerada com MkDocs.

```bash
# Servir a documentação localmente
mkdocs serve

# Build da documentação
mkdocs build
```

## 🔄 Pull Requests

### Antes de Enviar

- [ ] Código formatado (`black`, `isort`, `prettier`).
- [ ] Linting passou (`flake8`, `mypy`, `eslint`).
- [ ] Todos os testes passaram.
- [ ] Documentação atualizada para refletir as mudanças.
- [ ] `CHANGELOG.md` atualizado se for uma mudança notável.
- [ ] Commit messages seguem a convenção.

### Processo de Review

1.  **Automatizado**: O CI/CD executa testes e verificações de qualidade.
2.  **Revisão por Pares**: Um ou mais mantenedores revisarão o código.
3.  **Discussão**: Feedback e sugestões serão feitos no PR.
4.  **Aprovação**: O PR será mesclado após a aprovação.

## 🐛 Reportar Bugs

Use o template de issue de bug e forneça:
- **Ambiente**: OS, versão do Python/Node, versão do CLI da xCloud.
- **Framework do Projeto**: Ex: Next.js 13, FastAPI 0.95.
- **Descrição clara do bug**.
- **Passos para reproduzir**.
- **Logs relevantes**.

## ✨ Solicitar Funcionalidades

Use o template de feature request e descreva:
- O problema que a funcionalidade resolve.
- A solução que você propõe.
- Alternativas que você considerou.

## 📦 Contribuição com Componentes e Templates

### Criando um Template

```bash
# Use o CLI para criar a estrutura
xcloud create template my-cool-template --type nextjs

cd my-cool-template

# Desenvolva seu template
# ...

# Publique no registry
xcloud publish
```

### `xcloud.json` para um Template

```json
{
  "name": "@seu-nome/my-cool-template",
  "version": "1.0.0",
  "description": "Um template incrível para Next.js com Tailwind.",
  "main": "src/index.js",
  "author": "Seu Nome <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-nome/my-cool-template.git"
  },
  "keywords": ["nextjs", "template", "tailwind", "dashboard"],
  "xcloud": {
    "type": "template",
    "framework": "nextjs",
    "requires": ">=1.0.0"
  }
}
```

## 🌍 Comunidade e Suporte

- **Discord**: [discord.gg/xcloud](https://discord.gg/xcloud)
  - `#development`: Discussões técnicas sobre a plataforma.
  - `#help`: Suporte da comunidade.
- **GitHub Discussions**: Para discussões mais longas e propostas de arquitetura.
- **GitHub Issues**: Para bugs e solicitações de funcionalidades.

## 📄 Licença

Ao contribuir com a xCloud Platform, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](LICENSE).

## 🙏 Agradecimentos

Obrigado a todos os contribuidores que fazem a xCloud Platform cada vez melhor!

- Veja a lista completa em [CONTRIBUTORS.md](../../reference/contribuidores.md).

---

<div align="center">

**Dúvidas?** Entre em contato conosco no [Discord](https://discord.gg/xcloud)!

[📖 Documentação](https://docs.xcloud.io) | [🌐 Website](https://xcloud.io) | [💬 Discord](https://discord.gg/xcloud)

</div>
