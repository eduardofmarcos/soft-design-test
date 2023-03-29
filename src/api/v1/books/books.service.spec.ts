import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Connection, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
const createMockModel = <T = any>(): MockModel<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: MockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: Connection, useValue: createMockModel() },
        { provide: getModelToken('Book'), useValue: createMockModel() },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<MockModel>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne Book', () => {
    describe('when a book with ID exists', () => {
      it('should return the book object', async () => {
        const bookId = '1';
        const expectBook = {};

        bookModel.findOne.mockReturnValue(expectBook);
        const book = await service.findOne(bookId);
        expect(book).toEqual(expectBook);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException', async () => {
        const bookId = '1';
        bookModel.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(bookId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(
            `Book with this ${bookId} was not found.`,
          );
        }
      });
    });
  });
});
