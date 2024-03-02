const courierScrapers = {
  // "tpl-tracking": {
  //   scrapeData: async (trackingId, page) => {
  //     // Construct the URL for tracking information
  //     const url = `https://transitpl.com/track`;

  //     // Navigate to the tracking page and wait for it to load
  //     await page.goto(url, {
  //       timeout: 60000,
  //       waitUntil: "load",
  //     });

  //     await page.waitForSelector(`#tracknm`, {
  //       timeout: 12000,
  //       waitUntil: "load",
  //     });

  //     await page.type("#tracknm", trackingId);
  //     await page.waitForTimeout(2000);
  //     await page.click(
  //       "body > div > section.contact-details > div > div > div > form > div > div:nth-child(2) > button:nth-child(2)"
  //     );

  //     await page.waitForSelector(
  //       `body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr`,
  //       {
  //         timeout: 10000,
  //         waitUntil: "load",
  //       }
  //     );

  //     // await page.click("#header > div > div.cons_track > p");

  //     // await page.waitForTimeout(60000);

  //     await page.waitForTimeout(2000);

  //     // await page.click("#btnSingleAwbTrack");

  //     // await page.waitForTimeout(2000);
  //     // await page.waitForSelector(`#divtrackStatus > table > tbody > tr`, {
  //     //   timeout: 12000,
  //     //   waitUntil: "load",
  //     // });
  //     // await page.waitForTimeout(2000);

  //     // await page.click("#grd1_ctl02_LinkButton1");
  //     // await page.waitForSelector(`#GridView1 > tbody > tr`, {
  //     //   timeout: 12000,
  //     //   waitUntil: "load",
  //     // });
  //     // Extract tracking information using Puppeteer's evaluate function
  //     const trackingInfo = await page.evaluate(async () => {
  //       // Extract delivery status
  //       const deliveryStatus = await document
  //         .querySelector(
  //           "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(5) > b > span"
  //         )
  //         .innerText.trim();

  //       // if (deliveryStatus.trim().length == 0) {
  //       //   throw new Error();
  //       // }

  //       let from = await document
  //         .querySelector(
  //           "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(2) > strong"
  //         )
  //         .innerText.split("\n")[1]
  //         .trim();

  //       let to = await document
  //         .querySelector(
  //           "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(3)"
  //         )
  //         .innerText.split("\n")[1]
  //         .trim();

  //       // Extract checkpoints information
  //       const checkpoints = Array.from(
  //         document.querySelectorAll(
  //           "body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr"
  //         )
  //       ).map((checkpoint) => {
  //         return {
  //           date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
  //           time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
  //           activity: checkpoint
  //             .querySelector("td:nth-child(4)")
  //             .innerText.trim(),
  //           courierName: "Transit Point Logistics",
  //           location: checkpoint
  //             .querySelector("td:nth-child(3)")
  //             .innerText.trim(),
  //         };
  //       });

  //       // const checkpoints = activity.reverse();

  //       return { deliveryStatus, from, to, checkpoints };
  //     });

  //     return trackingInfo;
  //   },

  //   url: (trackingId) => `https://transitpl.com/track`,
  // },
 "tci-freight-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tcil.com/CnsTrack/TCI_CNS_Trac.aspx`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

       // Wait for a specific selector to appear in the page
       await page.waitForSelector("#txtCnsNo", {
        timeout: 12000,
        waitUntil: "load",
      });


      //Add tracking Id to input box
      await page.type("#txtCnsNo", trackingId);
      await page.waitForTimeout(2000);

      //Fetch captcha selector
      const selector =
        "#divData > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(1) > span";

      // Get the value from the element
      const finalValue = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        const value = element.textContent.split("=")[0].trim();
        return eval(value);
      }, selector);

      //Paste the captcha value in the input box
      await page.type("#txtCaptcha", `${finalValue}`);
      await page.waitForTimeout(2000);

      //   click on the track buttton
      await page.click("#btnSubmit");
      await page.waitForTimeout(1000);

      // Wait for a specific selector to appear in the page
      await page.waitForSelector("#divData > table:nth-child(6)", {
        timeout: 60000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#pt1\\:pgl5 > div:nth-child(2) > span"
        ).innerText
          ? "Delivered"
          : "In Transit";

        let from = document
          .querySelector("#tdbkg")
          .innerText.trim()
          .split("-->")[0];

        let to = document
          .querySelector("#tdbkg")
          .innerText.trim()
          .split("-->")[1];
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#divData > table:nth-child(6) > tbody > tr > td > table > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText,
            time: "",
            activity: checkpoint.querySelector("td:nth-child(3)").innerText,
            courierName: "TCI Frieght",
            location: checkpoint.querySelector("td:nth-child(2)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => {
      return `https://www.tcil.com/CnsTrack/TCI_CNS_Trac.aspx`;
    },
  },
};

module.exports = courierScrapers;
