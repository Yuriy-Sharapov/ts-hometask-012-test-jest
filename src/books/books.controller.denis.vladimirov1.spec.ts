import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';
import { Book } from './classes/book.class';

describe('BooksController', () => {
  let app: INestApplication
  let booksService: { [key: string]: jest.Mock<any, any> } = {
    _getMaxId: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
        imports: [BooksModule],
    })
        .overrideProvider(BooksService)  // переопределяем провайдера на локальный объект
        .useValue(booksService)
        .compile()
    
    app = ModuleRef.createNestApplication()
    await app.init()
  })

  it('/GET books', async () =>{
    const mockResult = [];
    booksService.getAll.mockImplementation(() => Promise.resolve(mockResult));

    // const books = await booksService.getAll()
    // console.log(books)

    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(mockResult);
  });

  it('/POST book', async () => {
    const mockBookDto = {
      "title"      : "Test Book",
      "description": "Test Description",
      "author"     : "Test Author"
    };
    console.log("===mockBookDto===")
    console.log(mockBookDto)

    const mockResult = new Book(1, "Test Book", "Test Description", "Test Author");
    booksService.create.mockImplementation(() => Promise.resolve(mockBookDto));
    //booksService.create.mockImplementation(() => Promise.resolve(mockResult));

    return request(app.getHttpServer())
      .post('/books')
      .send(mockBookDto)
      .expect(201)
      .expect(mockBookDto);
      // .expect(mockResult);
  });

  afterAll(async () => {
    await app.close()
  })
});