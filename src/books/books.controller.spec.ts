import * as request from 'supertest'
import { Test } from '@nestjs/testing';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';

describe('BooksController', () => {
  let app: INestApplication
  let booksService = {
    _getMaxId: f => f,
    getAll: () => ['test'],
    create: f => f,
    update: f => f,
    delete: f => f,
  }

  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
        imports: [BooksModule]
    })
        .overrideProvider(BooksService)  // переопределяем провайдера на локальный объект
        .useValue(booksService)
        .compile()
    
    app = ModuleRef.createNestApplication()
    await app.init()
  })

  it('/GET books', () =>{
      return request(app.getHttpServer())
          .get('/books')
          .expect(200)
          .expect(
            booksService.getAll()
          );
  });

  // it('/POST book', () =>{
  //   return request(app.getHttpServer())
  //       .get('/books')
  //       .expect(200)
  //       .expect(
  //         booksService.getAll()
  //       );
  // });

  afterAll( async () => {
      await app.close()
  })
});
