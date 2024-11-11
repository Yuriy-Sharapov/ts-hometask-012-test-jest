import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksService = await module.resolve<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  it('Check create Book', async () => {
    await booksService.create({ title: "Book1", description: "D1", author: "A1"})
    const books = await booksService.getAll()
    expect(books).toHaveLength(1)
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[0].description).toBe("D1")
    expect(books[0].author).toBe("A1")
  })

  it('Check getAll Book', async () => {
    await booksService.create({ title: "Book1", description: "D1", author: "A1"})
    await booksService.create({ title: "Book2", description: "D2", author: "A2"})
    await booksService.create({ title: "Book3", description: "D3", author: "A3"})

    const books = await booksService.getAll()
    expect(books).toHaveLength(3)
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[1].id).toBe(2)
    expect(books[1].title).toBe("Book2")
    expect(books[2].id).toBe(3)
    expect(books[2].title).toBe("Book3")
  })

  it('Check update Book', async () => {
    await booksService.create({ title: "Book1", description: "D1", author: "A1"})
    const books_before = await booksService.getAll()
    const id = books_before[0].id
    await booksService.update(id, { title: "BookU", description: "DU", author: "AU"})

    const books_after = await booksService.getAll()
    expect(books_after).toHaveLength(1)
    expect(books_after[0].id).toBe(1)
    expect(books_after[0].title).toBe("BookU")
    expect(books_after[0].description).toBe("DU")
    expect(books_after[0].author).toBe("AU")
  })

  it('Check delete Book', async () => {
    await booksService.create({ title: "Book1", description: "D1", author: "A1"})
    await booksService.create({ title: "Book2", description: "D2", author: "A2"})
    await booksService.create({ title: "Book3", description: "D3", author: "A3"})

    await booksService.delete(2)

    const books = await booksService.getAll()  
    expect(books).toHaveLength(2)  
    expect(books[0].id).toBe(1)
    expect(books[0].title).toBe("Book1")
    expect(books[1].id).toBe(3)
    expect(books[1].title).toBe("Book3") 
  })
});
