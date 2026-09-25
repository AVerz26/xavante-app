# 🦅 A'uwẽ - Aprenda Xavante

Aplicativo móvel estilo **Duolingo** para aprender vocabulário, frases, pronúncia falada e cultura da língua indígena **Xavante (A'uwẽ Mreme)**, funcionando **100% offline**.

---

## 📲 Download Direto do APK (Android)

Para baixar e instalar o aplicativo em qualquer celular Android, clique no link abaixo:

👉 **[Baixar AprendaXavante.apk (Última Versão)](https://github.com/AVerz26/xavante-app/releases/latest/download/AprendaXavante.apk)**

### 📱 Como instalar no celular Android:
1. Abra o link acima no navegador do celular (o download do arquivo `.apk` começará automaticamente).
2. Toque no arquivo baixado para iniciar a instalação.
3. Se o Android solicitar permissão, habilite a opção **"Permitir desta fonte"** (para instalar aplicativos fora da Google Play Store).
4. Pronto! O aplicativo funcionará **100% offline**, sem precisar de internet ou dados móveis.

---

## ✨ Principais Funcionalidades

- **Trilha de Lições Gamificada:** Níveis progressivos com desafios de múltipla escolha, montagem de frases com blocos de palavras, conexão de pares e desafios fonéticos.
- **Voz Humana e Pronúncia:** Síntese de voz com tratamento fonético dos sons Xavante (saltillo `'`, vogais nasais) com opções de reprodução normal (🔊) e lenta (🐢).
- **Dicionário Bilíngue Xavante ↔ Português:** Mais de 30 verbetes com busca instantânea, categorias, frases de exemplo e notas culturais sobre a aldeia e o Cerrado.
- **Sistema de Gamificação:** Ofensiva diária (Streak 🔥), Cristais (💎), Sistema de Vidas (❤️) e Conquistas desbloqueáveis.
- **Treino do Guerreiro (Prática Rápida):** Modo de fixação rápida para recuperar vidas perdidas.
- **100% Offline:** Não faz chamadas de rede externas; áudios, banco de dados e lógica funcionam direto no dispositivo.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 Moderno (Vanilla CSS com Design System nativo), JavaScript ES Modules.
- **Áudio:** Web Audio API (Efeitos sonoros e fanfarras) + Web Speech API (Voz humana) + Suporte a arquivos MP3 reais em `public/audio/`.
- **Mobile Packaging:** [Capacitor](https://capacitorjs.com/) (Android nativo).
- **CI/CD:** [GitHub Actions](.github/workflows/build-apk.yml) para compilação e publicação automática do APK no GitHub Releases.

---

## 🚀 Como Compilar uma Nova Versão via GitHub Actions

1. Faça suas alterações nos arquivos locais.
2. Dê dois cliques em `enviar_para_github.bat` (ou execute `git push origin main`).
3. O GitHub Actions iniciará automaticamente o workflow de compilação.
4. Em aproximadamente 2 minutos, o novo arquivo `.apk` estará gerado e publicado na seção **Releases** com link direto de download!
