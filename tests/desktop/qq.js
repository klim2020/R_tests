

// dependencies
const expect = require('chai').expect;
const puppeteer = require('puppeteer');

// pointer to our browser tab so it will persist between tests
let page;
const host = process.env.MOCHA_TEST_HOST;
const time = 3000;

// the test suite
describe('Тесты десктопа', function () {
    this.timeout(0); // Useful when testing really slow Drupal sites

    // open a new browser tab and set the page variable to point at it
    before (async function () {
        global.expect = expect;
        global.browser = await puppeteer.launch( { headless: false, args: [
                '--window-size=1920,1080',
            ] } );
        //для безголового браузера
        //global.browser = await puppeteer.launch( { headless: true } );
        page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        page.setViewport({width: 2000, height: 1000});
    });

    // close the browser when the tests are finished
    after (async function () {
        await page.close();
        await browser.close();
    });

    describe('тесты переключения языка', function () {
        it('should work', async function () {
            await page.goto('http://mydev.qrepublik.id/auth')
            await page.waitForTimeout(3000);

            let selector = true;

            let i = 1;

            while(selector){


                await page.waitForSelector('.ant-dropdown-trigger')

                await page.waitForTimeout(1000);

                await page.click('.ant-dropdown-trigger')

                await page.waitForTimeout(1000);
                try {
                    await page.waitForSelector('div > .ant-dropdown > .ant-dropdown-menu > .ant-dropdown-menu-item:nth-child('+i+') > .ant-dropdown-menu-title-content')

                    await page.waitForTimeout(1000);

                    await page.click('div > .ant-dropdown > .ant-dropdown-menu > .ant-dropdown-menu-item:nth-child('+i+') > .ant-dropdown-menu-title-content')

                    await page.waitForTimeout(1000);
                }catch (e){
                    selector = false;
                }


                i++;
                console.log(i);
            }


        });
    });


});