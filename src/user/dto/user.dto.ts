import { IsEnum, IsString } from 'class-validator';

export enum TypeUser {
  TEACHER,
  STUDENT,
}

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(TypeUser)
  typeUser: TypeUser;
}
