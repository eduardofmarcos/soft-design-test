import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';
import { BooksService } from './books.service';
import { PaginationQuery } from 'src/common/dto/pagination-query/pagination-query.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-types.enum';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';

@Auth(AuthType.Bearer)
@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() paginationQuery:PaginationQuery) {
    return this.booksService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateBookDto: UpdateBookDto) {
    return this.booksService.update(id, UpdateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
