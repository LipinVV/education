#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const mainQuestion = 'Загадано число в диапазоне от 0 до 100. Угадайте!';

const randomValueFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const minimumValue = 0;
const maximumValue = 100;
const guessValue = randomValueFromInterval(minimumValue, maximumValue);

const handleAnswer = (answer) => {
    const convertedValue = +answer;
    const correctType = !isNaN(convertedValue);

    if (!correctType) {
        console.log('Введённое значение не является числом!');
    } else {
        if (convertedValue === guessValue) {
            console.log('Угадали!');
            rl.close();
        } else if (convertedValue > guessValue) {
            console.log('Больше, чем нужно');
        } else if (convertedValue < guessValue) {
            console.log('Меньше, чем нужно');
        }
    }
};

rl.question(mainQuestion, (answer) => {
    handleAnswer(answer);
    rl.on('line', (answer) => {
        handleAnswer(answer);
    });
});
