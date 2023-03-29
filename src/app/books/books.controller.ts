import { Controller, Get, Patch, Query, Body, Param } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-types.enum';
import { QueryFilter } from 'src/common/dto/query.dto-ts/query.dto';
import { UpdateBookDto } from './update-book.dto/update-book.dto';
import { BooksService } from './books.service';

@Auth(AuthType.Bearer)
@Controller('books')
export class BooksController {
    constructor(private readonly booksService:BooksService){}
  @Get()
  findAll(@Query() query: QueryFilter) {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateBookDto: UpdateBookDto) {
    return this.booksService.update(id, UpdateBookDto);
  }
}
