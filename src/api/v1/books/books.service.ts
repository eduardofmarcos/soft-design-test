import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';
import { QueryFilter } from 'src/common/dto/query.dto-ts/query.dto';
import { APIfeatures } from 'src/common/query';

@Injectable()
export class BooksService {
  @InjectModel(Book.name) private readonly bookModel: Model<Book>;

  async findAll(query: QueryFilter) {
    let filter = {};

    const features = new APIfeatures(this.bookModel.find(filter), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return await features.query;
  }

  async findOne(id: string) {
    const book = await this.bookModel
      .findOne({
        _id: id,
      })
      

    if (!book)
      throw new NotFoundException(`Book with this ${id} was not found.`);

    return book;
  }

  create(createBookDto: CreateBookDto) {
    const book = new this.bookModel(createBookDto);

    return book.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel
      .findOneAndUpdate({ _id: id }, { $set: updateBookDto }, { new: true })
      .exec();

    if (!book)
      throw new NotFoundException(`Book with this ${id} was not found.`);

    return book;
  }

  async remove(id: string) {
    const book = await this.bookModel.findOneAndRemove({ _id: id });

    if (!book)
      throw new NotFoundException(`Book with this ${id} was not found.`);
  }
}
