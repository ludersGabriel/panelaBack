import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'

@ObjectType()
export class Task {
  @Field(type => ID)
  id: string

  @Field(type => String)
  name: string

  @Field(type => String, { nullable: true })
  description?: string | null

  @Field(type => Date, { nullable: true })
  date?: Date | null

  @Field(type => Boolean, { nullable: true })
  completed: boolean | null

  @Field(type => ID)
  userId: string

  @Field(type => ID)
  projectId: string
}

@InputType()
export class TaskCreateInput {
  @Field(type => String)
  @MinLength(3)
  name: string

  @Field(type => String, { nullable: true })
  @MaxLength(50)
  description?: string | null

  @Field(type => Date, { nullable: true })
  date?: Date | null

  @Field(type => Boolean, { nullable: true })
  completed?: boolean | null
}

@InputType()
export class TaskUpdateInput {
  @Field(type => ID)
  id: string

  @Field(type => String, { nullable: true })
  @MinLength(3)
  name?: string

  @Field(type => String, { nullable: true })
  @MaxLength(50)
  description?: string | null

  @Field(type => Date, { nullable: true })
  date?: Date | null

  @Field(type => Boolean, { nullable: true })
  completed?: boolean | null
}
