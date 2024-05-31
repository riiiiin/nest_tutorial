import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindUniqueUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-unique-user.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  user(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findUnique(args);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
