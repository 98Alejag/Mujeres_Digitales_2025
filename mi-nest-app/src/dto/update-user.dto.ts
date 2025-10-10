import { IsNotEmpty } from "class-validator";
import * as userEntity from "src/entities/user.entity"
import { CreateUserDTO } from "./create-user.dto";

export class UpdateUserDTO extends CreateUserDTO {
    
    @IsNotEmpty()
    role: userEntity.Roles;
}