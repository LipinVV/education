#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const randomValueFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileName = argv._[0];

const logResult = (result) => {
    fs.appendFile(fileName, result + '\n', (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
        }
    });
}

const init = () => {
    const playingValue = randomValueFromInterval(1, 2);

    rl.question('Угадайте число (1 или 2): ', (answer) => {
        const userGuess = +answer;

        if (userGuess === playingValue) {
            console.log('Поздравляем! Вы угадали.');
            logResult(`Угадал: ${userGuess}`);
        } else {
            console.log(`Не угадали. Загаданное число: ${playingValue}`);
            logResult(`Не угадал: ${userGuess}, Загаданное число: ${playingValue}`);
        }
        rl.close();
    });
}

init();
