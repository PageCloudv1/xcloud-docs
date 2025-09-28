# 🤖 xCloud CLI - Automação com IA

## 🔥 **Integração com Gemini CLI + GitHub Actions**

Baseado no [run-gemini-cli](https://github.com/google-github-actions/run-gemini-cli), vamos implementar automação inteligente no **xcloud-cli**:

### 🎯 **Actions Recomendadas para Automação**

#### **1. 🤖 Pull Requests Automáticos**

```yaml
# .github/workflows/gemini-automated-prs.yml
name: 🤖 Gemini - Automated PRs

on:
  schedule:
    - cron: '0 9 * * MON'  # Toda segunda às 9h
  workflow_dispatch:
  issues:
    types: [labeled]  # Quando issue recebe label "enhancement"

jobs:
  auto-pr:
    if: contains(github.event.label.name, 'enhancement') || github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: google-github-actions/run-gemini-cli@v0.1.12
        with:
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          prompt: |
            Você é um desenvolvedor Go expert trabalhando no xCloud CLI.
            Analise o repositório e:
            1. Identifique melhorias no código Go
            2. Crie PRs automáticos com:
               - Otimizações de performance
               - Melhorias de documentação
               - Correções de bugs menores
               - Atualização de dependências go.mod
            3. Use padrões Go idiomáticos
            4. Mantenha compatibilidade com Windows/Linux
            
      - name: 📝 Create automated PR
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "🤖 auto: gemini suggested improvements"
          title: "🤖 Automated improvements by Gemini CLI"
          body: |
            ## 🤖 Automated PR by Gemini CLI
            
            This PR contains automated improvements suggested by AI:
            - Performance optimizations
            - Code quality improvements  
            - Documentation updates
            - Dependency updates
            
            **Review carefully before merging!**
          branch: "auto/gemini-improvements-${{ github.run_number }}"
```

#### **2. 💬 Comentários Inteligentes em PRs**

```yaml
# .github/workflows/gemini-pr-review.yml
name: 🔍 Gemini - Smart PR Review

on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

jobs:
  gemini-review:
    if: github.event.action == 'opened' || contains(github.event.comment.body, '@gemini-cli')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: google-github-actions/run-gemini-cli@v0.1.12
        with:
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          prompt: |
            Você é um especialista em Go e CLI tools. Analise este PR do xCloud CLI:
            
            FOCO ESPECÍFICO:
            - Performance de binários cross-platform
            - Segurança em comandos CLI
            - Padrões idiomáticos Go
            - Compatibilidade Windows/Linux
            - Uso correto do Cobra framework
            - Memory leaks e resource handling
            
            Forneça:
            ✅ O que está bom
            ⚠️  Pontos de atenção
            🔧 Sugestões específicas de melhoria
            🐛 Bugs potenciais identificados
            ⚡ Oportunidades de otimização
```

#### **3. 🎯 Issues Automáticas**

```yaml
# .github/workflows/gemini-issue-automation.yml
name: 🎯 Gemini - Smart Issue Management

on:
  issues:
    types: [opened, labeled]
  schedule:
    - cron: '0 18 * * FRI'  # Sexta às 18h - criar issues de melhorias

jobs:
  triage-issue:
    if: github.event.action == 'opened'
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/run-gemini-cli@v0.1.12
        with:
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          prompt: |
            Analise esta issue do xCloud CLI e faça triage inteligente:
            
            1. CATEGORIZE com labels apropriados:
               - bug/enhancement/documentation
               - priority: low/medium/high/critical
               - platform: linux/windows/cross-platform
               - component: cli/build/security/performance
               
            2. ADICIONE CONTEXTO:
               - Reprodução steps se for bug
               - Acceptance criteria se for enhancement
               - Links para documentação relacionada
               - Estimate de esforço (S/M/L/XL)

      - name: 🏷️ Auto-label issues
        uses: actions/github-script@v7
        with:
          script: |
            // Lógica para aplicar labels baseado na análise do Gemini
            const labels = ['needs-triage', 'xcloud-cli'];
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              labels: labels
            });

  weekly-improvement-issues:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: google-github-actions/run-gemini-cli@v0.1.12
        with:
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          prompt: |
            Analise o código do xCloud CLI e crie issues semanais de melhorias:
            
            ÁREAS DE FOCO:
            - Performance benchmarks results
            - Security vulnerabilities encontradas
            - Dependency updates necessárias  
            - Documentation gaps
            - UX improvements no CLI
            - Cross-platform compatibility issues
            
            Para cada issue, crie:
            - Título claro e específico
            - Descrição detalhada com contexto
            - Acceptance criteria
            - Links para código relevante
            
      - name: 📋 Create improvement issues
        uses: actions/github-script@v7
        with:
          script: |
            // Script para criar issues baseadas nas sugestões do Gemini
            const improvements = [
              {
                title: "🔧 Weekly CLI Performance Optimization",
                body: "Automated weekly check for performance improvements...",
                labels: ["enhancement", "performance", "weekly-automation"]
              }
            ];
            
            for (const issue of improvements) {
              await github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title: issue.title,
                body: issue.body,
                labels: issue.labels
              });
            }
```

#### **4. 🚀 Releases Automáticos**

```yaml
# .github/workflows/gemini-smart-release.yml  
name: 🚀 Gemini - Smart Releases

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  analyze-for-release:
    runs-on: ubuntu-latest
    outputs:
      should_release: ${{ steps.gemini.outputs.should_release }}
      version_bump: ${{ steps.gemini.outputs.version_bump }}
      changelog: ${{ steps.gemini.outputs.changelog }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 50  # Último 50 commits
          
      - uses: google-github-actions/run-gemini-cli@v0.1.12
        id: gemini
        with:
          gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
          prompt: |
            Analise os commits recentes do xCloud CLI e determine:
            
            1. DEVE FAZER RELEASE? (true/false)
               Considere: bugs críticos, features importantes, breaking changes
               
            2. TIPO DE VERSÃO:
               - patch: bug fixes, small improvements
               - minor: new features, enhancements  
               - major: breaking changes
               
            3. CHANGELOG AUTOMÁTICO:
               Categorize commits em:
               🚀 Features, 🐛 Bug Fixes, ⚡ Performance, 🔒 Security, 📖 Documentation
               
            Formato de saída:
            should_release=true/false
            version_bump=patch/minor/major  
            changelog=## Changes...

  create-release:
    needs: analyze-for-release
    if: needs.analyze-for-release.outputs.should_release == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: 🏷️ Create release tag
        uses: mathieudutour/github-tag-action@v6.1
        id: tag
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          default_bump: ${{ needs.analyze-for-release.outputs.version_bump }}
          tag_prefix: "v"
          
      - name: 🚀 Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ steps.tag.outputs.new_tag }}
          name: "🚀 xCloud CLI ${{ steps.tag.outputs.new_tag }}"
          body: ${{ needs.analyze-for-release.outputs.changelog }}
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### **5. 🎨 Actions Adicionais Recomendadas**

```yaml
# Outras actions úteis para automação:

# Auto-approve dependabot PRs
- uses: hmarr/auto-approve-action@v3
  if: github.event.pull_request.user.login == 'dependabot[bot]'

# Auto-merge after checks pass  
- uses: pascalgn/merge-action@v0.15.6
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    merge_method: squash

# Stale issues/PRs cleanup
- uses: actions/stale@v8
  with:
    days-before-stale: 30
    days-before-close: 7

# Performance regression detection
- uses: benchmark-action/github-action-benchmark@v1
  with:
    tool: 'go'
    output-file-path: benchmark.txt

# Security scanning
- uses: securecodewarrior/github-action-gosec@master
  
# Dependency updates
- uses: renovatebot/github-action@v37.440.7
```

### 🔑 **Setup Necessário**

1. **🔐 Secrets requeridos:**

   ```bash
   GEMINI_API_KEY         # Do Google AI Studio
   GITHUB_TOKEN           # Automático
   ```

2. **📝 Arquivo GEMINI.md no root:**

   ```markdown
   # xCloud CLI - Context for Gemini
   
   ## Project Overview
   Go-based CLI tool for xCloud platform with cross-platform support (Windows/Linux).
   
   ## Code Standards  
   - Go 1.21+ with idioms
   - Cobra framework for CLI
   - Cross-platform compatibility
   - Security-first approach
   - Performance-optimized binaries
   
   ## Architecture
   - cmd/xcloud/ - Main CLI application
   - Cross-compilation for amd64/arm64
   - Automated testing and releases
   ```

### 🎉 **Resultado Final**

Com essas automações, o **xcloud-cli** terá:

- 🤖 **PRs automáticos** com melhorias sugeridas por IA
- 🔍 **Code reviews inteligentes** em todos os PRs  
- 🎯 **Issues automáticas** de melhorias semanais
- 🚀 **Releases inteligentes** baseadas em análise de commits
- 💬 **Comentários contextuais** em PRs e issues
- 🏷️ **Auto-labeling** e organização

**Próximo passo:** Implementar os workflows escolhidos!
