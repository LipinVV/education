const constants = {
    dictionary: {
        errorMessage: 'Книга не найдена',
        positiveMessage: 'ok',
        uploadError: 'Файл не прикреплён или не найден',
        writeError: 'Ошибка при записи данных в файл:',
        writeSuccess: 'Файл успешно загружен и данные записаны по пути: ',
    },
    urlRoutes: {
        indexRoute: '/',
        loginRoute: '/login',
        loginErrorRoute: '/loginErrorRoute',
        allBooksRoute: '/books',
        userRoute: '/user',
        signupRoute: '/signup',
        me: '/me',
    },
}

module.exports = constants;
