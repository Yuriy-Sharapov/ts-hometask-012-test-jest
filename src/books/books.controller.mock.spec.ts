import * as request from 'supertest'
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('BooksController', () => {
  let app: INestApplication
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === BooksService) {
          return { getAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

      app = moduleRef.createNestApplication()
      await app.init()
      booksController = moduleRef.get(BooksController);
      booksService = moduleRef.get(BooksService)
  });

  it('/GET books', async () =>{
    return request(app.getHttpServer())
        .get('/books')
        .expect(200)
        .expect(
          await booksService.getAll()
        );
  });
});