
# Exemplo Codigo em Puppeteer

## Uso/Exemplos

```javascript
//exemplo teste
const puppeteer = require('puppeteer');

(async () => {
  // Inicia o navegador
  const browser = await puppeteer.launch({ headless: false }); // Abre o navegador de forma visível

  // Cria uma nova página
  const page = await browser.newPage();

  try {
    // Emula um dispositivo móvel (opcional)
    const iPhone = puppeteer.devices['iPhone X'];
    await page.emulate(iPhone);

    // Navega até a página desejada
    console.log('Navegando até https://example.com...');
    await page.goto('https://example.com');

    // Tira um screenshot da tela
    console.log('Capturando screenshot...');
    await page.screenshot({ path: 'screenshot.png' });

    // Obtém o título da página
    const pageTitle = await page.title();
    console.log('Título da página:', pageTitle);

    // Clica em um botão (se existir)
    const buttonSelector = 'button#submit';
    const buttonExists = await page.$(buttonSelector);
    if (buttonExists) {
      console.log('Clicando no botão', buttonSelector);
      await page.click(buttonSelector);
    } else {
      console.log('Botão', buttonSelector, 'não encontrado.');
    }

    // Aguarda até que um elemento específico apareça na página
    const contentSelector = 'div.content';
    await page.waitForSelector(contentSelector);
    console.log('Elemento', contentSelector, 'foi encontrado na página.');

    // Exibe o conteúdo HTML da página (opcional)
    const pageContent = await page.content();
    console.log('Conteúdo HTML:', pageContent);

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fecha o navegador
    console.log('Fechando o navegador...');
    await browser.close();
    console.log('Navegação finalizada.');
  }
})();
```

**ADBLOCK**

```javascript
const puppeteer = require('puppeteer-extra');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// desativa o headless e adiciona um delay para ver as ações
const browser = await puppeteer.launch({ headless: false, slowMo: 50 }); 
// abre uma nova pagina
const page = await browser.newPage();

//emula um dispositio
const iPhone = puppeteer.devices['iPhone X'];
await page.emulate(iPhone);

//tira print
 await page.screenshot({ path: 'screenshot.png' });

//simula um click
await page.click('.rc-anchor-center-item.rc-anchor-checkbox-holder');

//fecha o browser
await browser.close();
```
