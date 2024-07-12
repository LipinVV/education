const dictionary = {
    errorMessage: 'Книга не найдена',
    positiveMessage: 'ok',
    uploadDirectory: 'uploads',
    uploadError: 'Файл не прикреплён или не найден',
    writeError: 'Ошибка при записи данных в файл:',
    writeSuccess: 'Файл успешно загружен и данные записаны по пути: ',
}

const urlRoutes = {
    loginRoute: '/api/user/login',
     allBooksRoute: '/api/books',
     singleBookRoute: '/api/books/:id',
     downloadBookRoute: '/api/books/:id/download',
}

const constants = {
    dictionary,
    urlRoutes,
}

module.exports = constants;
