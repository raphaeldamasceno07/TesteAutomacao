const { By, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments('--start-maximized');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();


const personalInformation = [
    {
        name: "Eduardo Raphael Silva Damasceno",
        phoneNumber: "(22) 99247-9791",
        email: "rdamasceno1852@gmail.com",
    },
];

const addressInformation = [
    {
        zipCode: "12345-678",
        street: "Rua Rio de Janeiro",
        city: "Belo Horizonte",
        state: "MG",
    },
];

const paymentInformation = [
    {
        name: "Raphael Damasceno",
        creditCardNumber: "1234 5678 9012 3456",
        expirationDate: "03/2032",
        securityCode: "123",
    },
];

async function insertData() {
    try {
        await driver.get('https://onfly-rpa-forms-62njbv2kbq-uc.a.run.app/')
        await insertPersonalData()
        await insertAddress()
        await InsertPaymentData()
    } catch (error) {
        console.error(`Erro ao acessar ${error}`);
    }
    finally {
        await driver.quit()
    }

}

async function insertPersonalData() {
    let nameXpath = '//label[text()="Nome Completo"]/following-sibling::input'
    let phoneXpath = '//label[text()="Telefone"]/following-sibling::input'
    let emailXpath = '//label[text()="E-mail"]/following-sibling::input'
    let nextButtonXpath = '//button[@id="next-btn"]'

    try {
        for (const data of personalInformation) {

            const nameInput = await driver.wait(until.elementLocated(By.xpath(nameXpath)), 10000)
            await driver.wait(until.elementIsVisible(nameInput), 10000).sendKeys(data.name)

            await driver.sleep(500)

            const phoneInput = await driver.wait(until.elementLocated(By.xpath(phoneXpath)), 10000)
            await driver.wait(until.elementIsVisible(phoneInput), 10000).sendKeys(data.phoneNumber)

            await driver.sleep(500)

            if (/^\S+@\S+\.\S+/.test(data.email)) {
                const emailInput = await driver.wait(until.elementLocated(By.xpath(emailXpath)), 10000)
                await driver.wait(until.elementIsVisible(emailInput), 10000).sendKeys(data.email)
            } else {
                await driver.executeScript('alert("email invalido por favor insira um email valido")')
                await driver.sleep(5000)
                throw new Error('Email inválido');
            }

            await driver.sleep(500)

        }

        const nextButton = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000)
        await driver.wait(until.elementIsVisible(nextButton)).click()

    } catch (error) {
        throw error
    }
}

async function insertAddress() {
    let zipCodeXpath = '//label[text()="CEP"]/following-sibling::input'
    let streetXpath = '//label[text()="Endereço"]/following-sibling::input'
    let cityXpath = '//label[text()="Cidade"]/following-sibling::input'
    let stateXpath = '//label[text()="Estado"]/following-sibling::input'
    let nextButtonXpath = '//button[@id="next-btn"]'

    try {
        for (const data of addressInformation) {

            const zipCodeInput = await driver.wait(until.elementLocated(By.xpath(zipCodeXpath)), 10000)
            await driver.wait(until.elementIsVisible(zipCodeInput), 10000).sendKeys(data.zipCode)

            await driver.sleep(500)

            const streetInput = await driver.wait(until.elementLocated(By.xpath(streetXpath)), 10000)
            await driver.wait(until.elementIsVisible(streetInput), 10000).sendKeys(data.street)

            await driver.sleep(500)

            const cityInput = await driver.wait(until.elementLocated(By.xpath(cityXpath)), 10000)
            await driver.wait(until.elementIsVisible(cityInput), 10000).sendKeys(data.city)

            await driver.sleep(500)

            const stateInput = await driver.wait(until.elementLocated(By.xpath(stateXpath)), 10000)
            await driver.wait(until.elementIsVisible(stateInput), 10000).sendKeys(data.state)

            await driver.sleep(500)

        }

        const nextButton = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000)
        await driver.wait(until.elementIsVisible(nextButton)).click()

    } catch (error) {
        throw error
    }
}

async function InsertPaymentData() {
    let ownerXpath = '//label[text()="Nome do Titular"]/following-sibling::input';
    let creditCardNumberXpath = '//label[text()="Número do Cartão"]/following-sibling::input';
    let expirationDateXpath = '//label[text()="Data de Validade"]/following-sibling::input';
    let securityCodeXpath = '//label[text()="CVV"]/following-sibling::input';
    let nextButtonXpath = '//button[@id="next-btn"]'

    try {
        for (const data of paymentInformation) {

            const ownerNameInput = await driver.wait(until.elementLocated(By.xpath(ownerXpath)), 10000)
            await driver.wait(until.elementIsVisible(ownerNameInput), 10000).sendKeys(data.name)

            await driver.sleep(500)

            const creditCardNumberInput = await driver.wait(until.elementLocated(By.xpath(creditCardNumberXpath)), 10000)
            await driver.wait(until.elementIsVisible(creditCardNumberInput), 10000).sendKeys(data.creditCardNumber)

            await driver.sleep(500)

            const expirationDateInput = await driver.wait(until.elementLocated(By.xpath(expirationDateXpath)), 10000)
            await driver.wait(until.elementIsVisible(expirationDateInput), 10000).sendKeys(data.expirationDate)

            await driver.sleep(500)

            const securityCodeInput = await driver.wait(until.elementLocated(By.xpath(securityCodeXpath)), 10000)
            await driver.wait(until.elementIsVisible(securityCodeInput), 10000).sendKeys(data.securityCode)

            await driver.sleep(500)

        }

        const nextButton = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000)
        await driver.wait(until.elementIsVisible(nextButton)).click()

        await driver.sleep(5000)

    } catch (error) {
        throw error
    }
}

insertData()
