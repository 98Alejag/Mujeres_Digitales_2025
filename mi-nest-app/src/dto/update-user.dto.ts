import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator';
import * as userEntity from 'src/entities/user.entity';

export class UpdateUserDTO {
  @IsOptional()
  role: userEntity.Roles;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(6, 10, { message: 'Password must be between 6 and 10 characters' })
  password?: string;

  @IsOptional()
  @IsInt()
  @Min(18, { message: 'Age must be at least 18' })
  @Max(100, { message: "Age mustn't exceed 100" })
  age?: number;
}
