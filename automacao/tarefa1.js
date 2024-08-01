const { Builder, By, until } = require('selenium-webdriver')
const driver = new Builder().forBrowser('chrome').build();

const allData = [
    {
        name: "Eduardo Raphael Silva Damasceno",
        phoneNumber: "(22) 99247-9791",
        email: "rdamasceno1852@gmail.com",
        zipCode: "12345-678",
        street: "Rua Rio de Janeiro",
        city: "Belo Horizonte",
        state: "MG",
        creditCardName: "Raphael Damasceno",
        creditCardNumber: "1234 5678 9012 3456",
        expirationDate: "03/2032",
        securityCode: "123",
    }
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
    let nameXpath = 'Nome Completo'
    let phoneXpath = 'Telefone'
    let emailXpath = 'E-mail'

    try {
        for (const data of allData) {

            personalizedInputXpath(nameXpath, data.name)

            await driver.sleep(500)

            personalizedInputXpath(phoneXpath, data.phoneNumber)

            await driver.sleep(500)

            if (/^\S+@\S+\.\S+/.test(data.email)) {

                personalizedInputXpath(emailXpath, data.email)

            } else {
                await driver.executeScript('alert("email invalido por favor insira um email valido")')
                await driver.sleep(5000)
                throw new Error('Email inválido');
            }

            await driver.sleep(500)

        }

        nextBtn()
    } catch (error) {
        throw error
    }
}

async function insertAddress() {
    let zipCodeXpath = 'CEP'
    let streetXpath = 'Endereço'
    let cityXpath = 'Cidade'
    let stateXpath = 'Estado'

    try {
        for (const data of allData) {
            personalizedInputXpath(zipCodeXpath, data.zipCode)

            await driver.sleep(500)

            personalizedInputXpath(streetXpath, data.street)

            await driver.sleep(500)

            personalizedInputXpath(cityXpath, data.city)

            await driver.sleep(500)

            personalizedInputXpath(stateXpath, data.state)

            await driver.sleep(500)

        }

        nextBtn()

    } catch (error) {
        throw error
    }
}

async function InsertPaymentData() {
    let ownerXpath = 'Nome do Titular';
    let creditCardNumberXpath = 'Número do Cartão';
    let expirationDateXpath = 'Data de Validade';
    let securityCodeXpath = 'CVV';


    try {
        for (const data of allData) {

            personalizedInputXpath(ownerXpath, data.creditCardName)

            await driver.sleep(500)

            personalizedInputXpath(creditCardNumberXpath, data.creditCardNumber)

            await driver.sleep(500)

            personalizedInputXpath(expirationDateXpath, data.expirationDate)

            await driver.sleep(500)

            personalizedInputXpath(securityCodeXpath, data.securityCode)

            await driver.sleep(500)

        }

        nextBtn();

        await driver.sleep(5000)

    } catch (error) {
        throw error
    }
}

const personalizedInputXpath = async (xpath, data) => {
    const input = await driver.wait(until.elementLocated(By.xpath(`//label[text()="${xpath}"]/following-sibling::input`)), 10000)
    await driver.wait(until.elementIsVisible(input), 10000).sendKeys(data)
}

const nextBtn = async () => {
    const nextButton = await driver.wait(until.elementLocated(By.xpath("//button[@id='next-btn']")), 10000)
    await driver.wait(until.elementIsVisible(nextButton)).click()
}

insertData()