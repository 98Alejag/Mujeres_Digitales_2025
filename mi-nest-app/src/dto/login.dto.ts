import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length} from 'class-validator';

export class LoginDTO {
  
  @ApiProperty({example:'example@email.com', description:'Email valido del usuario'})
  @IsEmail()
  email: string;

  @ApiProperty({example:'123456', description:'La contraseña debe tener minimo 6 caracteres y máximo 10'})
  @Length(6, 10, { message: 'Password must be between 6 and 10 characters' })
  password: string;
}
