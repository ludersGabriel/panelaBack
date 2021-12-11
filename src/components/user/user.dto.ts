import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'
import { Task } from '@components/task/task.dto'
import { Project } from '@components/project/project.dto'
import { SubTask } from '@components/subTask/subTask.dto'

@ObjectType()
export class PrivateUser {
  @Field(type => ID)
    id: string

  @Field(type => String)
    email: string

  @Field(type => String)
    name: string

  @Field(type => Number)
    count: number

  @Field(type => String)
    role: string

  @Field(type => String)
    password: string
}

@ObjectType()
export class User {
  @Field(type => ID)
    id: string

  @Field(type => String)
    email: string

  @Field(type => String)
    name: string

  @Field(type => Number)
    count: number

  @Field(type => String)
    role: string

  @Field(type => [Task], { nullable: true })
    tasks?: Task[]

  @Field(type => [Project], { nullable: true })
    projects?: Project[]

  @Field(type => [SubTask], { nullable: true })
    subTasks?: SubTask[]
}

@InputType()
export class UserRegisterInput {
  @Field(type => String)
  @IsEmail()
    email: string

  @Field(type => String)
  @MinLength(8)
    password: string

  @Field(type => String)
    name: string
}

@InputType()
export class UserUpdateInput {
  @Field(type => ID)
    id: string

  @Field(type => String, { nullable: true })
    name?: string

  @Field(type => String, { nullable: true })
  @IsEmail()
    email?: string

  @Field(type => String, { nullable: true })
  @MinLength(8)
    password?: string

  @Field(type => Number, { nullable: true })
    count?: number
}
