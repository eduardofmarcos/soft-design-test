import { Module } from '@nestjs/common';
import { BooksModule } from './v1/books/books.module';

@Module({
  imports: [BooksModule]
})
export class ApiModule {}
