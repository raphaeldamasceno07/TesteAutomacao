const { By, Builder, until, Browser } = require("selenium-webdriver");
const driver = new Builder().forBrowser('chrome').build();

const personalInformation = [
  {
    name: "Eduardo Raphael Silva Damasceno",
    phoneNumber: "(48) 5678-9012",
    email: "usuario1@example.com",
  },
];

const addressInformation = [
  {
    zipCode: "12345-678",
    street: "Dimas Pereira Lopes",
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
    await driver.get("https://onfly-rpa-forms-62njbv2kbq-uc.a.run.app/");
    await inputPersonalData();
    await inputAddress();
    await inputPaymentData();
  } catch (error) {
    console.error("Ocorreu um erro ao inserir dados:", error);
  }
  finally {
    await driver.quit();
  }
}

async function inputPersonalData() {
  let nameXpath = '//label[text()="Nome Completo"]/following-sibling::input';
  let phoneNumberXpath = '//label[text()="Telefone"]/following-sibling::input';
  let emailXpath = '//label[text()="E-mail"]/following-sibling::input';
  let nextButtonXpath = '//button[@id="next-btn"]';

  try {
    for (const data of personalInformation) {
      const nameInput = await driver.wait(until.elementLocated(By.xpath(nameXpath)), 10000);
      await driver.wait(until.elementIsVisible(nameInput), 10000);

      const phoneInput = await driver.wait(until.elementLocated(By.xpath(phoneNumberXpath)), 10000);
      await driver.wait(until.elementIsVisible(phoneInput), 10000);

      await driver.sleep(600)

      const emailInput = await driver.wait(until.elementLocated(By.xpath(emailXpath)), 10000);
      await driver.wait(until.elementIsVisible(emailInput), 10000);

      await driver.sleep(600)

      const buttonNext = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000);
      await driver.wait(until.elementIsVisible(buttonNext), 10000);

      await driver.sleep(600)

      await nameInput.sendKeys(data.name);
      await phoneInput.sendKeys(data.phoneNumber);

      await driver.sleep(600)

      if (/^\S+@\S+\.\S+/.test(data.email)) {
        await emailInput.sendKeys(data.email);
        await driver.sleep(600)
      }
      else {
        console.log(`E-mail ${data.email} é inválido. Por favor, insira um e-mail válido.`);
      }
      await buttonNext.click();
    }
  }
  catch (error) {
    console.error("Ocorreu um erro ao inserir dados:", error);
  }

}



async function inputAddress() {
  let titleXpath =
    '//h1[text()="Complete os dados para a confirmação da sua inscrição!"]';
  let zipCodeXpath = '//label[text()="CEP"]/following-sibling::input';
  let addressXpath = '//label[text()="Endereço"]/following-sibling::input';
  let cityXpath = '//label[text()="Cidade"]/following-sibling::input';
  let stateXpath = '//label[text()="Estado"]/following-sibling::input';
  let nextButtonXpath = '//button[@id="next-btn"]';

  try {

    const title = await driver.wait(until.elementLocated(By.xpath(titleXpath)), 10000);
    await driver.wait(until.elementIsVisible(title), 10000);

    for (const item of addressInformation) {
      const zipCodeInput = await driver.wait(until.elementLocated(By.xpath(zipCodeXpath)), 10000);
      await driver.wait(until.elementIsVisible(zipCodeInput), 10000);

      const addressInput = await driver.wait(until.elementLocated(By.xpath(addressXpath)), 10000);
      await driver.wait(until.elementIsVisible(addressInput), 10000);

      const cityInput = await driver.wait(until.elementLocated(By.xpath(cityXpath)), 10000);
      await driver.wait(until.elementIsVisible(cityInput), 10000);

      const stateInput = await driver.wait(until.elementLocated(By.xpath(stateXpath)), 10000);
      await driver.wait(until.elementIsVisible(stateInput), 10000);


      await zipCodeInput.sendKeys(item.zipCode);
      await driver.sleep(600)

      await addressInput.sendKeys(item.street);
      await driver.sleep(600)

      await cityInput.sendKeys(item.city);
      await driver.sleep(600)

      await stateInput.sendKeys(item.state);
      await driver.sleep(600)

    }
    const nextButton = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000);
    await driver.wait(until.elementIsVisible(nextButton), 10000);
    await nextButton.click();

  } catch (error) {
    console.error("Ocorreu um erro ao inserir dados:", error);
  }
}



async function inputPaymentData() {
  let titleXpath = '//h1[text()="Complete os dados para a confirmação da sua inscrição!"]';
  let ownerXpath = '//label[text()="Nome do Titular"]/following-sibling::input';
  let creditCardNumberXpath = '//label[text()="Número do Cartão"]/following-sibling::input';
  let expirationDateXpath = '//label[text()="Data de Validade"]/following-sibling::input';
  let securityCodeXpath = '//label[text()="CVV"]/following-sibling::input';
  let nextButtonXpath = '//button[text()="Submit"]';


  const title = await driver.wait(until.elementLocated(By.xpath(titleXpath)), 10000);
  await driver.wait(until.elementIsVisible(title), 10000);

  for (const item of paymentInformation) {
    const ownerInput = await driver.wait(until.elementLocated(By.xpath(ownerXpath)), 10000);
    await driver.wait(until.elementIsVisible(ownerInput), 10000);

    const creditCardNumberInput = await driver.wait(until.elementLocated(By.xpath(creditCardNumberXpath)), 10000);
    await driver.wait(until.elementIsVisible(creditCardNumberInput))

    const expirationDateInput = await driver.wait(until.elementLocated(By.xpath(expirationDateXpath)), 10000);
    await driver.wait(until.elementIsVisible(expirationDateInput), 10000);

    const securityCodeInput = await driver.wait(until.elementLocated(By.xpath(securityCodeXpath)), 10000);
    await driver.wait(until.elementIsVisible(securityCodeInput), 10000);


    ownerInput.sendKeys(item.name);
    await driver.sleep(600)
    creditCardNumberInput.sendKeys(item.creditCardNumber);
    await driver.sleep(600)
    expirationDateInput.sendKeys(item.expirationDate);
    await driver.sleep(600)
    securityCodeInput.sendKeys(item.securityCode);
    await driver.sleep(600)

  }
  const nextButton = await driver.wait(until.elementLocated(By.xpath(nextButtonXpath)), 10000);
  await driver.wait(until.elementIsVisible(nextButton), 10000);
  nextButton.click();

  await driver.sleep(5000);

}

insertData();

