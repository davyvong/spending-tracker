import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorageFileModel {
  @Field()
  contentType: string;

  @Field()
  createTime: number;

  @Field()
  mediaLink: string;

  @Field()
  name: string;

  @Field()
  size: number;

  @Field()
  updateTime: number;
}
