# MongoDB Requests

## Ссылка на CRUD API: https://www.mongodb.com/docs/manual/crud/

## Вставка данных о минимум двух книгах в коллекцию `books`:
```javascript
db.books.insertMany([
  {
    _id: '1',
    title: "Book One",
    description: "Description for the first book",
    authors: "First author"
  },
  {
    _id: '2',
    title: "Book Two",
    description: "Description for the second book",
    authors: "Second author"
  }
]);
```

## Запрос для поиска полей документов коллекции `books` по полю `title`:
```javascript
db.books.find({ title: "Book One" });
```

## Запрос для редактирования полей: `description` и `authors` коллекции books по `_id` записи:
```javascript
db.books.updateOne(
    { _id: '1' },
    {
        $set: {
            description: "Updated new description",
            authors: "Updated new author"
        }
    }
);
```

