#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('current', {
        alias: 'current',
        type: 'boolean',
        description: 'Show the full current date',
    })
    .option('year', {
        alias: 'y',
        type: 'boolean',
        description: 'Show the year',
    })
    .option('month', {
        alias: 'm',
        type: 'boolean',
        description: 'Show the month',
    })
    .option('date', {
        alias: 'd',
        type: 'boolean',
        description: 'Show the day',
    })
    .help()
    .argv;

const now = new Date();
let result = null;

const arrayOfValues = argv._;
const otherKeys = Object.keys(argv).filter(key => key !== '_' && key !== '$0').length > 0;

const { addDays, addMonths, subDays, subMonths, addYears, subYears } = require('date-fns');

if(arrayOfValues.includes('current')) {
    // изолировал общий вывод, так как он всеобъемлющий и информативный
    if(!otherKeys) {
        result = now.toISOString();
    }

    if (argv.year) {
        result = now.getFullYear();
    }

    if(argv.month) {
        result = now.getMonth() + 1;
    }

    if(argv.date) {
        result = now.getDate()
    }
}

const operationValue = arrayOfValues[1];

if(arrayOfValues.includes('add')) {
    if(argv.date) {
        result = addDays(now, operationValue);
    }

    if(argv.month) {
        result = addMonths(now, operationValue);
    }

    if(argv.year) {
        result = addYears(now, operationValue);
    }
}

if(arrayOfValues.includes('sub')) {
    if(argv.date) {
        result = subDays(now, operationValue);
    }

    if(argv.month) {
        result = subMonths(now, operationValue);
    }

    if(argv.year) {
        result = subYears(now, operationValue);
    }
}

console.log(result);
