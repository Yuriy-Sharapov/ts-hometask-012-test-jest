import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './classes/book.class';
import { BookDto } from './classes/book.dto.class';
import { IParamId } from './interfaces/IParamId.interface';
import { deepStrictEqual } from 'assert';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Get()
    getAll(): Promise<Book[]> {
        return this.bookService.getAll()
    }

    @Post()
    create(@Body() body: BookDto): Promise<Book> {
        return this.bookService.create(body)
    }

    @Put(':id')
    update(
        @Param() { id }: IParamId,
        @Body() body: BookDto): Promise<Book> {
        
        return this.bookService.update(Number(id), body)
    }

    @Delete(':id')
    delete(@Param() { id }: IParamId){
        return this.bookService.delete(Number(id))
    }
}
