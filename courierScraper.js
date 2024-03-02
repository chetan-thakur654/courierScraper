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
  "vrl-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.vrlgroup.in/track_consignment.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#lrno", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );
      await page.waitForTimeout(2000);

      // await page.waitForNavigation();

      await page.waitForSelector("#accordionExample", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector("#result_div > div:nth-child(1)")
          .innerText.trim();

        let from = document
          .querySelector("#collapseBooking > div > div > div:nth-child(2)")
          .innerText.trim()
          .split("\n")[1];
        let to = document
          .querySelector("#collapseBooking > div > div > div:nth-child(3)")
          .innerText.trim()
          .split("\n")[1];
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#collapseTransit > div > div`)
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div:nth-child(3)")
            .innerText.split("\n")[1],
          time: "",
          activity: `${checkpoint
            .querySelector("div:nth-child(1)")
            .innerText.split("\n")
            .join(" ")} ${checkpoint
            .querySelector("div:nth-child(2)")
            .innerText.split("\n")
            .join(" ")}`,
          courierName: "VRL Logistics",
          location: "",
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.vrlgroup.in/track_consignment.aspx`,
  },
};

module.exports = courierScrapers;
