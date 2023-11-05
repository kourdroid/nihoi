const puppeteer = require("puppeteer");
const fs = require("fs");

const baseUrl =
  "https://witanime.pics/episode/jujutsu-kaisen-2nd-season-%d8%a7%d9%84%d8%ad%d9%84%d9%82%d8%a9-";
const totalEpisodes = 15;
const scrapedData = {}; 

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let episode = 1; episode <= totalEpisodes; episode++) {
    const url = `${baseUrl}${episode}/`;
    await page.goto(url);
    await page.waitForSelector(".hardsub-content");

    const links = await page.evaluate(() => {
      const linkElements = document.querySelectorAll(
        ".hardsub-content ul#episode-servers li a[data-url]"
      );
      const linksArray = Array.from(linkElements);
      return linksArray.map((link) => {
        const dataUrl = link.getAttribute("data-url");
        return atob(dataUrl);
      });
    });

    const episodeKey = `Episode ${episode}`;
    scrapedData[episodeKey] = links; 

    console.log(`Links for Episode ${episode}:`);
    console.table(links);
  }

  await browser.close();

  // Write the scraped data to a JSON file
  fs.writeFile("scraped_data.json", JSON.stringify(scrapedData), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data has been written to scraped_data.json");
  });
})();
