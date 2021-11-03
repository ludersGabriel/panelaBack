import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'
import { Context } from '@src/context'
import { userRepo } from '@components/user/user.repo'
import { AuthChecker } from 'type-graphql'

export const hash = (str: string): Promise<string> => bcrypt.hash(str, 12)

export const checkPassword = (
  inputPassword: string,
  hashedPassword: string
):Promise<boolean> => bcrypt.compare(inputPassword, hashedPassword)

const defaultUser = {
  id: '',
  role: '',
  count: -1
}

const getTokenPayload = (token: string) => {
  try {
    return jwt.verify(token, process.env.APP_SECRET || '') as any
  } catch {
    return { user: defaultUser }
  }
}

export const getUser = (token: string) => {
  return getTokenPayload(token)
}

export const AuthError = () => new AuthenticationError('user not authenticaded')

export const RoleError = () => new AuthenticationError('wrong permissions to use this endpoint')

export const OwnerError = () => new AuthenticationError('wrong ownership to use this endpoint')

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  const user = await userRepo.user(context.user.id)
  if (context.user === defaultUser || !user) throw AuthError()

  if (roles.length > 0 && !roles.includes(context.user.role)) throw RoleError()

  if (user?.count !== context.user.count) throw AuthError()

  return true
}
