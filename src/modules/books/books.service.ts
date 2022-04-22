import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new HttpException('Books already exists', HttpStatus.NOT_FOUND);
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();

    return books;
  }

  async findById(id: string) {
    const book = await this.prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!book) {
      throw new HttpException('Books not exists', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new HttpException('Books not exists', HttpStatus.NOT_FOUND);
    }

    const book = await this.prisma.book.update({
      where: {
        id,
      },
      data,
    });

    return book;
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new HttpException('Books not exists', HttpStatus.NOT_FOUND);
    }

    const book = await this.prisma.book.delete({
      where: {
        id,
      },
    });

    return book;
  }
}
