import { PostCreateNestedManyWithoutAuthorInput } from 'src/@generated/prisma-nestjs-graphql/post/post-create-nested-many-without-author.input';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => PostCreateNestedManyWithoutAuthorInput, { nullable: true })
  posts?: PostCreateNestedManyWithoutAuthorInput;
}
