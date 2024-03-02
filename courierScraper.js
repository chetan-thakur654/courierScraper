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
  "overseas-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.overseaslogistics.in/tracking.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#ContentPlaceHolder1_text`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#ContentPlaceHolder1_text", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#ContentPlaceHolder1_Button1");

      await page.waitForSelector(
        `#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label7_0")
          .innerText.trim();

        let to = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label16_0")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              activity: checkpoint
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "OverSeas Logistics",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.overseaslogistics.in/tracking.aspx`,
  },
};

module.exports = courierScrapers;
