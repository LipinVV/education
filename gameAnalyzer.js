const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const gameAnalyzer = () => {
    const argv = yargs(hideBin(process.argv)).argv;
    const fileName = argv._[0];
    const logFilePath = path.resolve(fileName);

    if (!fileName) {
        console.log('Пожалуйста, укажите имя файла логов.');
        process.exit(1);
    }

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла логов:', err);
            process.exit(1);
        }

        const lines = data.split('\n').filter(line => line.trim() !== '');
        let totalGames = 0;
        let wins = 0;
        let losses = 0;

        lines.forEach(line => {
            totalGames += 1;
            if (line.startsWith('Угадал')) {
                wins += 1;
            } else if (line.startsWith('Не угадал')) {
                losses += 1;
            }
        });

        const winsPercentage = (wins / totalGames) * 100;

        console.log('Общее количество партий:', totalGames);
        console.log('Количество выигранных партий:', wins);
        console.log('Количество проигранных партий:', losses);
        console.log('Процентное соотношение выигранных партий: ', winsPercentage.toFixed(2));
    });
}

module.exports = gameAnalyzer;
