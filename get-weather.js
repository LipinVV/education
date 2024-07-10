#!/usr/bin/env node

require('dotenv').config();

const http = require('http');
const querystring = require('querystring');
const token = process.env.TOKEN;

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const cities = yargs(hideBin(process.argv)).argv._;

const initCli = async () => {
    if(!cities.length) {
        console.log('Укажите город или города по очереди через пробел');
    }
    const promises = cities.map(async (city) => {
      const params = {
          q: city,
          appid: token,
          lang: 'ru',
          units: 'metric',
      };

      const convertedParams = querystring.stringify(params);

      const url = `http://api.openweathermap.org/data/2.5/weather?${convertedParams}`;
      const options = new URL(url);

      const req = http.get(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
              data += chunk;
          });

          res.on('end', () => {
              try {
                  const parsedData = JSON.parse(data);
                  console.log(parsedData);
              } catch (e) {
                  console.error(e.message);
              }
          });
      });

      req.on('error', (e) => {
          console.error(`Проблема с запросом: ${e.message}`);
      });

      req.end();
    });

    return Promise.all(promises);
}

initCli(cities);
