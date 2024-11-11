import { Injectable } from '@nestjs/common';
import { Book } from './classes/book.class';
import { BookDto } from './classes/book.dto.class';

@Injectable()
export class BooksService {

    private books: Book[] = []

    private _getMaxId(): number {        
        if(this.books.length === 0)
            return 0

        return Number(Math.max(...this.books.map(book => book.id)))
    }

    async getAll(): Promise<Book[]> {
        return this.books
    }

    async create(bookDto: BookDto): Promise<Book> {

        const id = this._getMaxId() + 1
        const book = new Book(id,
                              bookDto.title,
                              bookDto.description,
                              bookDto.author)
        this.books.push(book)
        return book
    }

    async update(id: number, bookDto: BookDto): Promise<Book> {

        const idx = this.books.findIndex( book => book.id === id )
        if (idx === -1) return null

        this.books[idx].title       = bookDto.title
        this.books[idx].description = bookDto.description
        this.books[idx].author      = bookDto.author

        return this.books[idx]
    }

    async delete(id: number): Promise<Book> {
        const idx = this.books.findIndex( book => book.id === id )
        if (idx === -1) return null

        const book = this.books[idx]
        this.books.splice(idx, 1)

        return book
    }
}
