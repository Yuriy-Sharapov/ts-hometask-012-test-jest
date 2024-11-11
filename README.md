Выполните задания.

**Задание 1.**

Установите пакет ```@nestjs/testing```.

**Задание 2.**

Напишите unit-тесты на ```BooksService```.

При написании теста используйте утилиты из ```@nestjs/testing```.

При создании тестового модуля используйте секцию providers, чтобы передать модель.

В качестве токена модели используйте [getModelToken](https://docs.nestjs.com/techniques/mongodb#testing).

**Задание 3.**

Напишите e2e-тесты для ```BooksController```.

При создании тестового модуля используйте секцию ```providers```, чтобы подменить ```BooksService```.

Вам не нужно целиком реализовывать ```BooksService```. Достаточно использовать [```jest.fn()```](https://docs.nestjs.com/fundamentals/testing#auto-mocking) для создания заглушек.