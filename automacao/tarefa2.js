const { By, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments('--start-maximized');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

async function OpenBrowser() {
    await driver.get("https://docs.python.org/3/");

    await driver.sleep(3000);

   await driver.executeScript(changeAllParagraphsTexts)

    await driver.sleep(3000);
}

async function changeAllParagraphsTexts() {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
        p.innerHTML = 'Texto alterado';
    });
}

OpenBrowser();
