const courierScrapers = {
  "mauritius-post-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.mauritiuspost.mu/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#close > div > a:nth-child(1)`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#close > div > a:nth-child(1)");
      await page.waitForTimeout(2000);

      await page.waitForSelector(`#track`, {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.type("#track", trackingId);
      await page.waitForTimeout(2000);
      await page.click("body > div.tool > div.tool1 > form > button");

      await page.waitForSelector(`body > div.page > div:nth-child(2) > div`, {
        timeout: 10000,
        waitUntil: "load",
      });

      // await page.click("#header > div > div.cons_track > p");

      // await page.waitForTimeout(60000);

      await page.waitForTimeout(2000);

      // await page.click("#btnSingleAwbTrack");

      // await page.waitForTimeout(2000);
      // await page.waitForSelector(`#divtrackStatus > table > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // await page.waitForTimeout(2000);

      // await page.click("#grd1_ctl02_LinkButton1");
      // await page.waitForSelector(`#GridView1 > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        // const deliveryStatus = await document
        //   .querySelector("#status")
        //   .innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // let from = await document.querySelector("#booked_at").innerText.trim();

        // let to = await document
        //   .querySelector("#ContentPlaceHolder1_DataList1_Label16_0")
        //   .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll("body > div.page > div:nth-child(2) > div")
        )
          .slice(2)
          .map((checkpoint) => {
            return {
              date: checkpoint.querySelector("div.track_row1").innerText.trim(),
              time: checkpoint.querySelector("div.track_row2").innerText.trim(),
              activity: checkpoint
                .querySelector("div.track_row4")
                .innerText.trim(),
              courierName: "Mauritius Post",
              location: checkpoint
                .querySelector("div.track_row4")
                .innerText.trim(),
            };
          });

        // const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.mauritiuspost.mu/`,
  },
  "shree-azad-transport-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.shreeazad.com/tracking.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#txtSATCTrack`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#txtSATCTrack", trackingId);
      await page.waitForTimeout(2000);
      await page.click(
        "body > section.tracking > div > div:nth-child(2) > div:nth-child(3) > div > button"
      );

      await page.waitForSelector(
        `#Grid > tbody > tr:nth-child(2) > td:nth-child(3)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#Grid > tbody > tr:nth-child(2) > td:nth-child(3)")
          .innerText.trim();

        return { deliveryStatus };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.shreeazad.com/tracking.php`,
  },
  "awcc-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.awcc.in/tracking.php?tracking_no=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(1) > td:nth-child(4)`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // await page.type("#txtSATCTrack", trackingId);
      // await page.waitForTimeout(2000);
      // await page.click(
      //   "body > section.tracking > div > div:nth-child(2) > div:nth-child(3) > div > button"
      // );

      // await page.waitForSelector(
      //   `#Grid > tbody > tr:nth-child(2) > td:nth-child(3)`,
      //   {
      //     timeout: 10000,
      //     waitUntil: "load",
      //   }
      // );

      // await page.click("#header > div > div.cons_track > p");

      // await page.waitForTimeout(60000);

      // await page.waitForTimeout(2000);

      // await page.click("#btnSingleAwbTrack");

      // await page.waitForTimeout(2000);
      // await page.waitForSelector(`#divtrackStatus > table > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // await page.waitForTimeout(2000);

      // await page.click("#grd1_ctl02_LinkButton1");
      // await page.waitForSelector(`#GridView1 > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(1) > td:nth-child(4)"
          )
          .innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // let from = await document.querySelector("#booked_at").innerText.trim();

        let to = await document
          .querySelector(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(2) > td:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.delivery-info > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "AWCC Courier",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        // const checkpoints = activity.reverse();

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.awcc.in/tracking.php?tracking_no=${trackingId}`,
  },
  "air-star-xpress-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#tracking_timeline_205369670 > li`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll("#tracking_timeline_205369670 > li")
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div.timeline-date.wow.zoomIn")
              .innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("div.timeline-panel.wow.fadeInRight > div")
              .innerText.trim(),
            courierName: "Airstar Express Courier",
            location: "",
          };
        });

        const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`,
  },
  "garudavega-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.garudavega.com/track/${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > main > section:nth-child(3) > article > article > div.ship-details-block.mt-20p > div.wrapper.mt-30p > ul > li`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            "body > main > section:nth-child(3) > article > article > div.ship-details-block.mt-20p > div.wrapper.mt-30p > ul > li"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div > div:nth-child(1) > h4")
              .innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("div > div.shipment-areas > h6")
              .innerText.trim(),
            courierName: "Garudawega Courier",
            location: checkpoint
              .querySelector("div > div.shipment-areas > p")
              .innerText.trim(),
          };
        });

        const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.garudavega.com/track/${trackingId}`,
  },
  "chetak-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://chetak.co.in/track`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#consiment`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#consiment", trackingId);
      await page.waitForTimeout(2000);
      await page.click("#btn-login");

      await page.waitForSelector(
        `#editForm > div.modal-body > table > tbody > tr:nth-child(5) > td:nth-child(2)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(5) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(3) > td:nth-child(2)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(3) > td:nth-child(4)"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://chetak.co.in/track`,
  },
  "dpex-worldwide-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://erp.dpex.com.cn/trace-and-track/index?id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#trackingTimeline > li`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#lastTrack")
          .innerText.trim();

        let to = await document.querySelector("#destination").innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#trackingTimeline > li")
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div.timeline-datetime > p:nth-child(1)")
              .innerText.trim(),
            time: checkpoint
              .querySelector(" div.timeline-datetime > p:nth-child(2)")
              .innerText.trim(),
            activity: checkpoint
              .querySelector("div.timeline-panel > div.timeline-heading > h4")
              .innerText.trim(),
            courierName: "DPEX Worldwide",
            location: checkpoint
              .querySelector("div.timeline-panel > div.timeline-body")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://erp.dpex.com.cn/trace-and-track/index?id=${trackingId}`,
  },
  "tpl-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://transitpl.com/track`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#tracknm`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#tracknm", trackingId);
      await page.waitForTimeout(2000);
      await page.click(
        "body > div > section.contact-details > div > div > div > form > div > div:nth-child(2) > button:nth-child(2)"
      );

      await page.waitForSelector(
        `body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(5) > b > span"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(2) > strong"
          )
          .innerText.split("\n")[1]
          .trim();

        let to = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(3)"
          )
          .innerText.split("\n")[1]
          .trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "Transit Point Logistics",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://transitpl.com/track`,
  },
};
