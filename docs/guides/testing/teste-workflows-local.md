# 🧪 Testando GitHub Actions Localmente com Node.js

## 📋 Pré-requisitos

### 1. Instalar o Act (GitHub Actions Local Runner)

**Windows (usando npm - recomendado):**

```bash
npm install -g @nektos/act
```

**Ou usando Chocolatey:**

```powershell
choco install act-cli
```

**macOS:**

```bash
brew install act
# ou via npm
npm install -g @nektos/act
```

**Linux:**

```bash
# Via npm (recomendado)
npm install -g @nektos/act

# Ou baixar releases
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### 2. Instalar Podman Desktop

- Baixe e instale o Podman Desktop para Windows
- O Act usa containers Podman para simular os runners do GitHub Actions

## 🚀 Scripts de Teste (Node.js)

### Setup Inicial

```bash
# Instalar dependências
npm install

# Verificar se Act está instalado
npm run install-act  # se necessário
```

### Teste Rápido - Validação de Sintaxe

```bash
# Validação rápida de todos os repositórios
node test-workflows.js --quick-test

# ou usando npm script
npm test
```

### Teste Completo - Job Específico

```bash
# Testar um repositório específico
node test-workflows.js -r xcloud-cli

# Testar com execução completa (sem dry-run)
node test-workflows.js --no-dry-run

# Auto-instalar Act se necessário
node test-workflows.js --install-act --quick-test
```

### Exemplos de Uso

```bash
# Teste rápido de sintaxe
node test-workflows.js -q

# Teste específico do xCloud CLI
node test-workflows.js --repository xcloud-cli

# Teste completo de todos os repos (pode demorar)
node test-workflows.js --no-dry-run

# Ajuda com todos os comandos
node test-workflows.js --help
```

## 🎯 Testes por Repositório

### xCloud CLI

```powershell
cd PageCloudv1-repos\xcloud-cli

# Testar apenas linting (mais rápido)
act --job lint-and-format --dry-run

# Testar matriz de Python (pode demorar)
act --job test-python --dry-run

# Testar build de release
act --job build-release --dry-run
```

### xCloud Dashboard  

```powershell
cd PageCloudv1-repos\xcloud-dashboard

# Testar linting frontend
act --job lint-and-format --dry-run

# Testar build
act --job build --dry-run

# Testar E2E (vai falhar sem browser, mas valida sintaxe)
act --job e2e-tests --dry-run
```

### xCloud Runtime

```powershell
cd PageCloudv1-repos\xcloud-runtime

# Testar runtime Python
act --job test-python-runtime --dry-run

# Testar runtime Node.js
act --job test-nodejs-runtime --dry-run

# Testar runtime Go
act --job test-go-runtime --dry-run
```

### xCloud Docs

```powershell
cd PageCloudv1-repos\xcloud-docs

# Testar linting de markdown
act --job lint-docs --dry-run

# Testar build da documentação
act --job build-docs --dry-run

# Testar validação de conteúdo
act --job validate-content --dry-run
```

## 🔧 Script Automatizado Completo

Crie este script PowerShell `test-workflows.ps1`:

```powershell
# test-workflows.ps1
param(
    [string]$Repository = "all",
    [switch]$DryRun = $true,
    [switch]$QuickTest = $false
)

$repos = @{
    "xcloud-platform" = @("lint-and-format", "test-python", "security")
    "xcloud-cli" = @("lint-and-format", "test-python", "build-release")
    "xcloud-dashboard" = @("lint-and-format", "build", "test")
    "xcloud-runtime" = @("test-python-runtime", "test-nodejs-runtime", "test-go-runtime")
    "xcloud-docs" = @("lint-docs", "build-docs", "validate-content")
    "xcloud-templates" = @("validate-templates", "test-samples")
    "xcloud-components" = @("lint-and-format", "build", "test")
    "xcloud-examples" = @("validate-examples", "test-examples")
}

function Test-Workflow {
    param(
        [string]$RepoName,
        [string[]]$Jobs
    )
    
    Write-Host "`n🚀 Testando $RepoName..." -ForegroundColor Cyan
    Push-Location "PageCloudv1-repos\$RepoName"
    
    if (!(Test-Path ".github\workflows\ci.yml")) {
        Write-Host "⚠️ Workflow não encontrado em $RepoName" -ForegroundColor Yellow
        Pop-Location
        return
    }
    
    # Listar workflows
    Write-Host "📋 Workflows disponíveis:" -ForegroundColor Gray
    act --list 2>$null
    
    if ($QuickTest) {
        # Apenas validação de sintaxe
        Write-Host "🔍 Validando sintaxe..." -ForegroundColor Gray
        act --dry-run 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Sintaxe válida em $RepoName" -ForegroundColor Green
        } else {
            Write-Host "❌ Erro de sintaxe em $RepoName" -ForegroundColor Red
        }
    } else {
        # Testar jobs específicos
        foreach ($job in $Jobs) {
            Write-Host "🧪 Testando job: $job" -ForegroundColor Gray
            
            if ($DryRun) {
                act --job $job --dry-run 2>$null
            } else {
                act --job $job 2>$null
            }
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ $job passou" -ForegroundColor Green
            } else {
                Write-Host "❌ $job falhou" -ForegroundColor Red
            }
        }
    }
    
    Pop-Location
}

# Executar testes
if ($Repository -eq "all") {
    foreach ($repo in $repos.Keys) {
        Test-Workflow -RepoName $repo -Jobs $repos[$repo]
    }
} else {
    if ($repos.ContainsKey($Repository)) {
        Test-Workflow -RepoName $Repository -Jobs $repos[$Repository]
    } else {
        Write-Host "❌ Repositório '$Repository' não encontrado" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Testes concluídos!" -ForegroundColor Green
```

## 🏃‍♂️ Como Executar

### Teste Rápido (apenas sintaxe)

```powershell
.\test-workflows.ps1 -QuickTest
```

### Teste Específico

```powershell
.\test-workflows.ps1 -Repository "xcloud-cli"
```

### Teste Completo (pode demorar)

```powershell
.\test-workflows.ps1 -DryRun:$false
```

## 📊 Interpretando os Resultados

- ✅ **Verde**: Workflow válido e executável
- ⚠️ **Amarelo**: Workflow encontrado mas com avisos
- ❌ **Vermelho**: Erro de sintaxe ou configuração
- 🔍 **Cinza**: Informações de debug

## 🚨 Limitações do Teste Local

1. **Secrets**: Use valores mock para testes
2. **Runners**: Act usa Ubuntu por padrão, pode diferir de Windows/macOS
3. **Actions Externas**: Algumas podem não funcionar perfeitamente local
4. **Recursos**: Podman precisa estar rodando

## 🎯 Próximos Passos

Após validar localmente:

1. **Commit** os workflows que passaram nos testes
2. **Push** para o repositório remoto  
3. **Verificar** execução real no GitHub Actions
4. **Ajustar** conforme necessário

---

💡 **Dica**: Comece sempre com `--dry-run` para validar sintaxe antes de executar completamente!
