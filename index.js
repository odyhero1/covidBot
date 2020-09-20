const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const bot = new Discord.Client();
const token = "";
bot.on("ready", () => {
  console.log("poop!");
  bot.user.setActivity("kaxtosTV", {
    type: "WATCHING",
  });
});

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
var todayDate = year + "-" + month + "-" + date;
console.log(year + "-" + month + "-" + date);

var days = 2; // Days you want to subtract
var dateN = new Date();
var last = new Date(dateN.getTime() - days * 24 * 60 * 60 * 1000);
let dayN = ("0" + last.getDate()).slice(-2);
let monthN = ("0" + (last.getMonth() + 1)).slice(-2);
var yearN = last.getFullYear();
var dayBeforeyesterdayDate = yearN + "-" + monthN + "-" + dayN;
console.log(dayBeforeyesterdayDate);

var http = require("https");
var options = {
  host: "api.covid19api.com",
  path:
    "https://api.covid19api.com/country/cyprus?from=" +
    dayBeforeyesterdayDate +
    "T00:00:00Z&to=" +
    todayDate +
    "T00:00:00Z",
  method: "GET",
};

var req = http.get(options, function (res) {
  // console.log("STATUS: " + res.statusCode);
  // console.log("HEADERS: " + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res
    .on("data", function (chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    })
    .on("end", function () {
      const body = Buffer.concat(bodyChunks);
      console.log(body);

      const result = JSON.parse(body);

      console.log(result.length);
      console.log(result);
      const dayBeforeyesterdayDetails = result[0];
      const yesterdayDetails = result[1];

      const yesterdayCases =
        yesterdayDetails.Confirmed - dayBeforeyesterdayDetails.Confirmed;
      const yesterdayDeaths =
        yesterdayDetails.Deaths - dayBeforeyesterdayDetails.Deaths;
      const todayCases = "Not Available Yet";
      const todayDeaths = "Not Available Yet";
      const lastUpdate = "" + yesterdayDetails.Date + "";
      const totalCases = "" + yesterdayDetails.Confirmed + "";
      const totalRecovered = "" + yesterdayDetails.Recovered + "";
      const totalActive = "" + yesterdayDetails.Active + "";
      const totalDeaths = "" + yesterdayDetails.Deaths + "";

      if (result.length == 3) {
        const todayDetauls = result[2];
        const todayCases = "" + todayDetauls.Confirmed - yesterdayCases + "";
        const todayDeaths = "" + todayDetauls.Deaths - yesterdayDeaths + "";
        const lastUpdate = +"" + todayDetauls.Date + "";
        const totalCases = "" + todayDetauls.Confirmed + "";
        const totalRecovered = "" + todayDetauls.Recovered + "";
        const totalActive = "" + todayDetauls.Active + "";
        const totalDeaths = "" + todayDetauls.Deaths + "";
      }

      bot.on("message", (msg) => {
        if (
          msg.content.includes("koronoios") ||
          msg.content.includes("covid19") ||
          msg.content.includes("coronavirus")
        ) {
          const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Cyprus koronoios")
            .setURL("https://www.worldometers.info/coronavirus/country/cyprus/")
            .setAuthor(
              "Covid 19 updates",
              "https://steliosfoundation.com.cy/wp-content/uploads/flag-cyprus.jpg",
              "https://www.worldometers.info/coronavirus/country/cyprus/"
            )
            .setDescription("Latest Updates")
            .setThumbnail(
              "https://steliosfoundation.com.cy/wp-content/uploads/flag-cyprus.jpg"
            )
            .addFields(
              // { name: "\u200B", value: "\u200B" },
              {
                name: "Yesterday Cases",
                value: yesterdayCases,
                inline: true,
              },
              {
                name: "Yesterday Deaths",
                value: yesterdayDeaths,
                inline: true,
              },
              {
                name: "Today Cases",
                value: todayCases,
              },
              {
                name: "Today Deaths",
                value: todayDeaths,
                inline: true,
              },
              {
                name: "Total Cases",
                value: totalCases,
              },
              {
                name: "Total Active Cases",
                value: totalActive,
              },
              {
                name: "Total Recovered Cases",
                value: totalRecovered,
              },
              {
                name: "Total Deaths",
                value: totalDeaths,
              },
              {
                name: "Updated At",
                value: lastUpdate,
              }
            )
            // .addField("Inline field title", "Some value here", true)
            // .setImage("https://i.imgur.com/wSTFkRM.png")
            .setTimestamp()
            .setFooter(
              "Made By Odysseas Herodotou"
              //   "https://i.imgur.com/wSTFkRM.png"
            );

          msg.channel.send(exampleEmbed);
        }
      });
      //   console.log("BODY: " + body);
      // ...and/or process the entire body here.
    });
});

bot.login(process.env.TOKEN);
