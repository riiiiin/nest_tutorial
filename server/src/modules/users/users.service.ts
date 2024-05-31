import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'nestjs-prisma';
import { FindUniqueUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-unique-user.args';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({ data: createUserInput });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(id);
  }

  async findUnique(args: FindUniqueUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
