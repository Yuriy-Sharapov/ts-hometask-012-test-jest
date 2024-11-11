import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

describe('BooksService', () => {
  let bookService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    bookService = await module.resolve<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  it('Check create Book', async () => {
    await bookService.create({ title: "Book1", description: "D1", author: "A1"})
    const books = await bookService.getAll()
    expect(books).toHaveLength(1)
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[0].description).toBe("D1")
    expect(books[0].author).toBe("A1")
  })

  it('Check getAll Book', async () => {
    await bookService.create({ title: "Book1", description: "D1", author: "A1"})
    await bookService.create({ title: "Book2", description: "D2", author: "A2"})
    await bookService.create({ title: "Book3", description: "D3", author: "A3"})

    const books = await bookService.getAll()
    expect(books).toHaveLength(3)
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[1].id).toBe(2)
    expect(books[1].title).toBe("Book2")
    expect(books[2].id).toBe(3)
    expect(books[2].title).toBe("Book3")
  })

  it('Check update Book', async () => {
    await bookService.create({ title: "Book1", description: "D1", author: "A1"})
    const books_before = await bookService.getAll()
    const id = books_before[0].id
    await bookService.update(id, { title: "BookU", description: "DU", author: "AU"})

    const books_after = await bookService.getAll()
    expect(books_after).toHaveLength(1)
    expect(books_after[0].id).toBe(1)
    expect(books_after[0].title).toBe("BookU")
    expect(books_after[0].description).toBe("DU")
    expect(books_after[0].author).toBe("AU")
  })

  it('Check delete Book', async () => {
    await bookService.create({ title: "Book1", description: "D1", author: "A1"})
    await bookService.create({ title: "Book2", description: "D2", author: "A2"})
    await bookService.create({ title: "Book3", description: "D3", author: "A3"})

    await bookService.delete(2)

    const books = await bookService.getAll()  
    expect(books).toHaveLength(2)  
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[1].id).toBe(3)
    expect(books[1].title).toBe("Book3") 
  })
});
