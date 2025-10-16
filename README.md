# COVID-19 Discord Bot

## Overview
This Discord bot provides real-time COVID-19 updates for Cyprus using the [COVID19 API](https://api.covid19api.com/). When users mention keywords like “covid19”, “koronoios”, or “coronavirus”, the bot automatically fetches and displays the most recent case statistics in a rich embedded message.

---

## Features
- Fetches the latest confirmed cases, deaths, recoveries, and active cases for Cyprus  
- Automatically updates data daily from the COVID19 API  
- Responds to messages containing COVID-related keywords  
- Displays results in a structured Discord embed with clear statistics  
- Shows total and daily changes in cases and deaths  

---

## Example Output
The bot posts a message containing:
- Yesterday’s new cases and deaths  
- Total active, recovered, and confirmed cases  
- Timestamp of the last update  
- Link to detailed stats on [Worldometers](https://www.worldometers.info/coronavirus/country/cyprus/)

---

## Tech Stack
| Component | Technology |
|------------|-------------|
| Runtime | Node.js |
| Libraries | discord.js, ytdl-core |
| Data Source | COVID19 API |
| Output | Discord Embed messages |

---

## Usage
1. Clone the repository.  
2. Install dependencies:
   ```bash
   npm install discord.js ytdl-core
