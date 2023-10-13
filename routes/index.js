var express = require("express");

var router = express.Router();

const puppeteer = require("puppeteer");

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

router.get("/", function (req, res, next) {
    if (Object.keys(req.query).length === 0) {
        res.render("index", { data: "404" });
    } else {
        var result = null;
        (async () => {
            const browser = await puppeteer.launch({ headless: "new" });

            const page = await browser.newPage();

            await page.goto(
                `https://www.x-rates.com/calculator/?from=${req.query.from}&to=${req.query.to}&amount=${req.query.Amount}`
            );

            const htmlPage = await page.content();
            const dom = new JSDOM(htmlPage);

            result =
                dom.window.document.querySelector(".ccOutputRslt").textContent;

            await browser.close();
            await console.log(result);
            await res.render("index", { data: result });
        })();
    }
});

module.exports = router;
