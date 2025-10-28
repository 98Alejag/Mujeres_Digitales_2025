import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator';
import * as userEntity from 'src/entities/user.entity';

export class UpdateUserDTO {
  @ApiProperty({example:'admin', description:'Rol del usuario', required: false})
  @IsOptional()
  role: userEntity.Roles;

  @ApiProperty({example:'Alejandra Gutierrez', description:'Nombre completo del usuario', required: false})
  @IsOptional()
  name?: string;

  @ApiProperty({example:'example@email.com', description:'Email valido del usuario', required: false})
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({example:'123456', description:'La contraseña debe tener minimo 6 caracteres y máximo 10', required:false})
  @IsOptional()
  @Length(6, 10, { message: 'Password must be between 6 and 10 characters' })
  password?: string;

  @ApiProperty({example:'27', description:'La edad del usuario debe ser mayor de edad', required: false })
  @IsOptional()
  @IsInt()
  @Min(18, { message: 'Age must be at least 18' })
  @Max(100, { message: "Age mustn't exceed 100" })
  age?: number;
}
