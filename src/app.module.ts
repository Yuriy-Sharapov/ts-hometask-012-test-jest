import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
