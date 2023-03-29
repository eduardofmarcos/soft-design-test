import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter } from 'src/common/dto/query.dto-ts/query.dto';
import { APIfeatures } from 'src/common/query';
import { Book } from 'src/api/v1/books/entities/book.entity';
import { Model } from 'mongoose';
import { UpdateBookDto } from './update-book.dto/update-book.dto';

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

  async update(id: string, updateBookDto: UpdateBookDto) {
    const isAvailable = await this.findOne(id);
    if (!isAvailable.isAvailable)
      throw new ConflictException('This book is not available to rent');

    const book = await this.bookModel
      .findOneAndUpdate({ _id: id }, { $set: updateBookDto }, { new: true })
      .exec();

    if (!book)
      throw new NotFoundException(`Book with this ${id} was not found.`);

    return book;
  }
}
