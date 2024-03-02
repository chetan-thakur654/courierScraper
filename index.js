const express = require("express");
const courierScrapers = require("./courierScraper.js");
const puppeteer = require("puppeteer");
const app = express();

const PORT = 3001;

// // Launch a headless browser with Puppeteer
let browserInstance = puppeteer.launch({
  timeout: 120000,
  waitUntil: "load",
  // headless: "new",
  headless: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

app.get("/", (req, res) => {
  res.json("hello! Api is running successfully. ");
});

app.get("/api/track/:courier/:trackingNo", async (req, res) => {
  const { courier, trackingNo } = req.params;
  // let page;
  let dynamicUrl;
  let page;
  try {
    // Check if there is a scraper for the specified courier
    const courierScraper = courierScrapers[courier];

    if (!courierScraper) {
      return res
        .status(402)
        .json({ error: `No information found for courier: ${courier}` });
      // throw new Error();
    }

    dynamicUrl = courierScraper ? courierScraper.url(trackingNo) : null;

    if (!courierScraper.scrapeData) {
      // If no scrapeData function is found or no dynamic URL, return the dynamic URL as a response
      return res.json({ url: dynamicUrl });
    }

    const browser = await browserInstance;
    page = await browser.newPage();
    // Set viewport size
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    // // Invoke the corresponding scraper function for the courier
    const trackingInfo = await courierScraper.scrapeData(trackingNo, page);
    console.log(trackingInfo);
    // // Check if tracking information is found
    if (!trackingInfo) {
      return res.status(402).json({
        error: "No tracking information found. Please check your tracking ID.",
        url: dynamicUrl,
      });
    }
    return res.json({ trackingInfo, url: dynamicUrl });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      // error: "Internal Server Error ! It Will Be Fixed Soon.",
      url: dynamicUrl,
    });
  } finally {
    // Close the page and browser
    if (page) {
      await page.close();
    }
  }
});

app.listen(PORT, () => console.log("Server is running at port " + PORT));
