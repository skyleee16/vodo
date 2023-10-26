// let i = "1"
let items = [];
const puppeteer = require('puppeteer');

const scrapeData = async  () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();
  await page.goto('https://vodochet.ru/');
  const mapsHandles = await page.$$('body > div.siteContent > div.mainRating > div > table > tbody > tr');

  let i = 0;
  let titleLink = "tr > td.tbName > a";

    for(const mapshandle of mapsHandles) {
        let title = "Null";
        let rating = "Null";
        let img = "Null";
        let sends = "Null";

        try {
            img = await page.evaluate(
                (el) => el.querySelector("tr > td.tbLogo > a > img").getAttribute("src"), mapshandle
            );
        } catch (error) {}
        try {
            title = await page.evaluate(
                (el) => el.querySelector("tr > td.tbName > a").textContent, mapshandle
            );
        } catch (error) {}
        try {
            rating = await page.evaluate(
                (el) => el.querySelector("tr > td.tbRate1 > span").textContent, mapshandle
            );
        } catch (error) {}
    
        try {
            sends = await page.evaluate(
                (el) => el.querySelector("tr > td.tbReview > span").textContent, mapshandle
            );
        } catch (error) {}

        items.push({img, title, rating, sends});
    }
    console.log(items)

    // await page.waitForSelector(titleLink, { timeout: 0 });
    // const postUrls = await page.$$eval(
    //     titleLink, postLinks => postLinks.map(link => link.href)
    // );

    // for (let postUrl of postUrls) {
    //     try {
    //         await page.goto(postUrl);
    //         console.log('Открываю страницу: ', postUrl);
    //     } catch (error) {
    //         console.log(error);
    //         console.log('Не удалось открыть страницу: ', postUrl);
    //     }

    //     let pagePathname = await page.evaluate(() => location.pathname);
    //     pagePathname = pagePathname.replace(/\//g, '-');

    //     const mailSelector = 'div.aboutCompanyData > div:nth-child(7) > p > a';
    //     await page.waitForSelector(mailSelector);
    //     const pageTitle = await page.$eval(
    //         mailSelector, mailSelector => mailSelector.textContent
    //     );
    //     console.log('Нашёл почту: ', pageTitle);
    // }
    // await page.goto('https://yandex.ru/maps/?display-text=%D0%A1%D1%87%D0%B5%D1%82%D1%87%D0%B8%D0%BA%D0%B8%20%D0%B8%20%D0%BF%D1%80%D0%B8%D0%B1%D0%BE%D1%80%D1%8B%20%D1%83%D1%87%D0%B5%D1%82%D0%B0&ll=39.519162%2C54.874462&mode=search&sctx=ZAAAAAgCEAAaKAoSCX%2B%2FmC1ZsUJAEVg4SfPHyktAEhIJRIXq5uIPAUARTgrzHmca7D8iBgABAgMEBSgKOABAA0gBYjpyZWxldl9yYW5raW5nX2hlYXZ5X3JlbGV2X3NlcnBfZm9ybXVsYT0wLjY6bDNfZGMyODQzODFfZXhwYjtyZWxldl9yYW5raW5nX2hlYXZ5X3JlbGV2X3dvcmxkX2Zvcm11bGE9MC43OmwzX2RjMjg0MzgxX2V4cGI6cmVsZXZfcmFua2luZ19oZWF2eV9yZWxldl9tYXBzX2Zvcm11bGE9MC42OmwzX2RjMjg0MzgxX2V4cGoCcnWdAc3MTD2gAQCoAQC9AXnDTnPCAYoB3abtuQb7ue3zBpbE0t4G%2FO%2FC%2BAOSxdjUBPr%2B7YXhBa%2Fv2YpQh9j3hrQG7rD0neEBp%2Bzri5EEjZvUoOIC8PWl0Y8Hyc%2FGvATA%2BIC9BO3ZmYWsArzHrK%2BrBr2Z0swG14a%2Fr%2FQBsNyKjpsB6I%2F%2Bn4cFluaXwKME4P20sZYDzMvq6wO58reNWZrV4%2FkD6gEA8gEA%2BAEAggI70KHRh9C10YLRh9C40LrQuCDQuCDQv9GA0LjQsdC%2B0YDRiyDRg9GH0LXRgtCwLCDQnNC%2B0YHQutCy0LCKAgkxODQxMDY4MzSSAgMyMTOaAgxkZXNrdG9wLW1hcHOqAjIyMzU3MzIyMTk1OTQsOTA5NTk3OTAxMzUsMjQxNzgyODk0MTE4LDE1MzgxMjg0MjIwNA%3D%3D&sll=39.519162%2C54.874462&sspn=9.335452%2C3.914414&text=%D0%A1%D1%87%D0%B5%D1%82%D1%87%D0%B8%D0%BA%D0%B8%20%D0%B8%20%D0%BF%D1%80%D0%B8%D0%B1%D0%BE%D1%80%D1%8B%20%D1%83%D1%87%D0%B5%D1%82%D0%B0%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&z=7.17');

//   await browser.close();
}
scrapeData()

module.exports = scrapeData;
// console.log(i)