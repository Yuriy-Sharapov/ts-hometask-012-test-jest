import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { BookDto } from './classes/book.dto.class';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (POST)', async () => {
    const bookDto: BookDto = {
      // укажите необходимые поля для BookDto
      title      : 'Test Book',
      description: 'Test description',
      author     : 'Test Author'
    };

    const response = await request(app.getHttpServer())
      .post('/books')
      .send(bookDto)
      .expect(201);

    expect(response.body).toMatchObject(bookDto);
  });

  it('/books/:id (PUT)', async () => {
    const bookDto: BookDto = {
      // укажите необходимые поля для BookDto
      title      : 'Updated Title',
      description: 'Updated Description',
      author     : 'Updated Author'
    };

    const response = await request(app.getHttpServer())
      .put('/books/1') // замените '1' на актуальный ID книги
      .send(bookDto)
      .expect(200);

    expect(response.body).toMatchObject(bookDto);
  });

  it('/books/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/books/1') // замените '1' на актуальный ID книги
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});