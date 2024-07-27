const { By, Builder, until, Browser } = require("selenium-webdriver");
const driver = new Builder().forBrowser('chrome').build();

async function OpenBrowser() {
    await driver.get("https://docs.python.org/3/");

    await driver.sleep(5000);

   await driver.executeScript(changeAllParagraphsTexts)

    await driver.sleep(10000);
}

async function changeAllParagraphsTexts() {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
        p.textContent = 'Texto alterado';
    });
}

OpenBrowser();