const dictionary = {
    errorMessage: 'Книга не найдена',
    positiveMessage: 'ok',
    uploadError: 'Файл не прикреплён или не найден',
    writeError: 'Ошибка при записи данных в файл:',
    writeSuccess: 'Файл успешно загружен и данные записаны по пути: ',
}

const urlRoutes = {
     indexRoute: '/',
     loginRoute: '/login',
     allBooksRoute: '/books',
     userRoute: '/user',
     signupRoute: '/signup',
     me: '/me',
}

const constants = {
    dictionary,
    urlRoutes,
}

module.exports = constants;
