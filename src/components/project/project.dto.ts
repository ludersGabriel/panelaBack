import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'
import { Task } from '@components/task/task.dto'

@ObjectType()
export class Project {
  @Field(type => ID)
  id: string

  @Field(type => String)
  name: string

  @Field(type => ID)
  userId: String

  @Field(type => String, { nullable: true })
  description?: string | null

  @Field(type => [Task], { nullable: true })
  tasks?: Task[]
}

@InputType()
export class ProjectCreateInput {
  @Field(type => String)
  @MinLength(3)
  name: string

  @Field(type => String, { nullable: true })
  @MaxLength(50)
  description?: string | null
}

@InputType()
export class ProjectUpdateInput {
  @Field(type => ID)
  id: string

  @Field(type => String, { nullable: true })
  @MinLength(3)
  name?: string

  @Field(type => String, { nullable: true })
  @MaxLength(50)
  description?: string | null
}
