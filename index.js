const puppeteer = require("puppeteer");
const fs = require("fs");
const iPhone = puppeteer.KnownDevices['iPad'];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.emulate(iPhone)

  const totalPages = 3;
  const allPropertyData = new Set();

  for (let num_page = 1; num_page <= totalPages; num_page++) {
    await page.goto(
      `https://www.zapimoveis.com.br/aluguel/terrenos-lotes-comerciais/ce+fortaleza/?__ab=exp-aa-test:B,new-discover-zap:alert,vas-officialstore-social:enabled&transacao=aluguel&onde=,Cear%C3%A1,Fortaleza,,,,,city,BR%3ECeara%3ENULL%3EFortaleza,-3.73272,-38.527013,&tipos=lote-terreno_comercial&pagina=${num_page}`
    );

    const list_card = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(".result-card");
      const cardList = [...nodeList];
      const propertyData = [];

      cardList.forEach((item) => {
        const propertyInfo = {};

        const locationElement = item.querySelector(".card__address");
        propertyInfo["Localização"] = locationElement
          ? locationElement.textContent.trim()
          : "";

        const addressElement = item.querySelector(".card__street");
        propertyInfo["Endereço"] = addressElement
          ? addressElement.textContent.trim()
          : "";

        const descriptionElement = item.querySelector(".card__description");
        propertyInfo["Descrição"] = descriptionElement
          ? descriptionElement.textContent.trim()
          : "";

        const contactElement = item.querySelector(
          ".result-card__cta-buttons button:last-child"
        );
        propertyInfo["Contato"] = contactElement
          ? contactElement.textContent.trim()
          : "";

        const sizeElement = item.querySelector(
          ".card__amenities .card__amenity"
        );
        propertyInfo["Tamanho"] = sizeElement
          ? sizeElement.textContent.trim()
          : "";

        const priceTotalElement = item.querySelector(".listing-price .l-text");
        propertyInfo["Preço Total"] = priceTotalElement
          ? priceTotalElement.textContent.trim()
          : "";

        const priceAluguelElement = item.querySelector(
          ".listing-price .l-text:last-child"
        );
        propertyInfo["Aluguel"] = priceAluguelElement
          ? priceAluguelElement.textContent.trim()
          : "";

        const highlightsElement = item.querySelector(
          ".l-card__tag--top .l-tag-card__content"
        );
        propertyInfo["Destaques"] = highlightsElement
          ? highlightsElement.textContent.trim()
          : "";

        propertyData.push(propertyInfo);
      });

      return propertyData;
    });

    list_card.forEach((card) => {
      allPropertyData.add(JSON.stringify(card));
    });

    await page.waitForTimeout(3000);
  }

  const uniquePropertyData = Array.from(allPropertyData).map((jsonString) =>
    JSON.parse(jsonString)
  );

  fs.writeFileSync(
    "card.json",
    JSON.stringify(uniquePropertyData, null, 2),
    (err) => {
      if (err) throw new Error("error");
      console.log("done!");
    }
  );

  await browser.close();
})();
