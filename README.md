📄 Guia de Documentação para o Projeto Mobile (README.md)
Substitua ou crie o arquivo na raiz da sua pasta mobile com o conteúdo abaixo:

Markdown
# 📱 RotuScan - Aplicativo Móvel (Guia de Instalação e Execução)

Bem-vindo à documentação técnica do módulo mobile do **RotuScan**. Este guia foi desenvolvido especificamente para orientar coordenadores, professores e avaliadores da banca a configurarem, instalarem e executarem o aplicativo em ambiente local de testes de forma simples e direta.

O RotuScan Mobile é o assistente do paciente, responsável por capturar fotos de rótulos de alimentos, processar os textos através de um motor de Reconhecimento Óptico de Caracteres (OCR), validar os ingredientes com base nas restrições definidas pelo Nutricionista e salvar o histórico diretamente no banco de dados em nuvem.

---

## 🏗️ Fluxo de Arquitetura do Sistema

Para entender como o aplicativo móvel se integra ao restante do ecossistema do TCC, o fluxo de dados segue a seguinte ordem lógica:



1. **Captura:** O usuário abre a câmera do aplicativo móvel e fotografa a lista de ingredientes de um produto.
2. **Processamento (OCR):** O texto contido na imagem é extraído em formato de string.
3. **Comunicação (API):** O aplicativo dispara uma requisição para o Back-end em Node.js enviando os dados textuais.
4. **Validação (MongoDB Atlas):** O Back-end cruza os dados com o dicionário de restrições do paciente contido no cluster `RotuScanDB`.
5. **Retorno:** O aplicativo exibe instantaneamente na tela se o produto é **Seguro (Verde)** ou **Perigoso (Vermelho)**, atualizando simultaneamente o Painel Web do Nutricionista.

---

## 🛠️ Pré-requisitos do Sistema

Antes de iniciar os comandos de instalação, certifique-se de ter instalado em sua máquina de testes:
1. **Node.js** (Versão 18 LTS ou superior recomendada)
2. **Gerenciador de pacotes NPM** (Instalado automaticamente junto com o Node)
3. **Ambiente de Simulação:** Um smartphone físico com o aplicativo **Expo Go** instalado (disponível na Google Play Store ou App Store) OU o **Android Studio** configurado com um emulador ativo.

---

## 🚀 Passo a Passo para Instalação e Configuração

### Passo 1: Clonar ou Acessar a Pasta do Projeto
Abra o terminal do seu sistema operacional ou o terminal do VS Code e navegue até a pasta dedicada ao projeto mobile:
```bash
cd ROTUSCAN/rotuscan-mobile
Passo 2: Instalação de Dependências (npm install)
Para baixar automaticamente todas as bibliotecas necessárias para a execução do app (incluindo pacotes de câmera, navegação de telas e comunicação HTTP), execute o seguinte comando:

Bash
npm install
Este comando lerá o arquivo package.json e gerará de forma automatizada a pasta node_modules com os binários necessários.

Passo 3: Configuração do Arquivo de Ambiente (.env)
O aplicativo móvel necessita saber o endereço de rede IP onde a nossa API (Back-end) está escutando para conseguir enviar as requisições de conferência.

Na raiz da pasta mobile, crie um arquivo chamado exatamente .env.

Insira a variável apontando para o IP da sua máquina local na rede (evite usar localhost se estiver testando com um celular físico na mesma rede Wi-Fi):

Snippet de código
# Exemplo de configuração apontando para a máquina servidora do backend
API_URL=[http://192.168.1.50:3000/api](http://192.168.1.50:3000/api)
(Substitua o número de IP acima pelo IPv4 real da sua máquina servidora, descoberto executando ipconfig no prompt de comando do Windows).

👁️ O Motor de OCR e Funcionamento do Tesseract
O RotuScan utiliza inteligência visual para ler o que está escrito nos rótulos. Dependendo da abordagem técnica adotada na arquitetura final do projeto, o processamento ocorre de uma das seguintes formas:

Abordagem por API Centralizada (Recomendada): O aplicativo móvel atua de forma leve. Ele captura a imagem em formato Base64 ou FormData e despacha via requisição HTTP para o nosso servidor Node.js. No servidor, o binário do Tesseract OCR realiza o reconhecimento pesado, devolvendo os alérgenos filtrados para o smartphone.

Abordagem On-Device (Local): Se executado localmente via bibliotecas wrappers como react-native-tesseract-ocr, o projeto inclui em sua estrutura de compilação os arquivos de idioma e treinamento de dicionário linguístico oficial do Tesseract para a língua portuguesa, localizados na subpasta:
android/app/src/main/assets/tessdata/por.traineddata

🏁 Inicializando o Aplicativo
Com todas as dependências instaladas e o arquivo .env configurado, inicie o servidor de empacotamento do projeto executando:

Bash
npm start
ou, se estiver utilizando o ecossistema Expo:

Bash
npx expo start
Como Visualizar o App em Funcionamento:
Um QR Code grande será desenhado diretamente na tela do seu terminal.

Pegue o seu celular físico conectado na mesma rede Wi-Fi do computador, abra o aplicativo Expo Go e selecione a opção de escanear código QR.

Aponte para a tela do computador. O projeto sofrerá o processo de build inicial em segundos e o RotuScan Mobile abrirá nativamente no seu aparelho, pronto para realizar os testes de scanner!


---

### 💡 Dicas de uso com o Gemini Code Assist:
Se os seus professores perguntarem sobre arquivos específicos, você pode usar os seguintes comandos no seu assistente do VS Code:
* Se quiser listar detalhadamente o nome de cada biblioteca instalada:
  > *"Gemini, olhe o meu arquivo `package.json` da pasta mobile e gere um texto resumido explicando o papel de cada biblioteca da seção `dependencies` para eu anexar na documentação do projeto."*
* Se houver algum erro de rota na comunicação mobile-banco:
  > *"Gemini, revise a função de envio de imagens no meu app mobile e confirme se ela está consumindo corretamente a variável `API_URL` vinda do arquivo `.env`."*

Esse guia em Markdown deixará claro para qualquer professor como o sistema foi construído, quais comandos rodar e como o banco de dados `RotuScanDB` recebe os registros! Quer ajustar mais alguma seção desse guia?
