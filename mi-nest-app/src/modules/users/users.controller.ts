import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService} from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RolesEnum, User } from 'src/entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: 'Obtener todos los ususarios'})
    @ApiResponse({status:200, description:'Lista de usuarios retornados desde la DB' })
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    findAll() {
        return this.usersService.findAll();
    }
    @Get(':id')
    @ApiOperation({summary: 'Obtiene el usuario por ID'})
    @ApiResponse({status:200, description:'Usuario encontrado desde DB' })
    @ApiResponse({status:400, description:'Usuario no encontrado en la DB' })
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }
    @Get('search/:name')
    @ApiOperation({summary: 'Obtiene el/los usuario(s) encontrados por nombre en la DB'})
    @ApiResponse({status:200, description:'Usuario(s) encontrado(s) desde DB' })
    @ApiResponse({status:400, description:'Usuario(s) no encontrado(s) en la DB' })
      @Roles(RolesEnum.ADMIN, RolesEnum.USER)
      async searchByName(@Param('name') name: string): Promise<User[]> {
        return this.usersService.findByName(name);
    }
    @Post()
    @ApiOperation({summary: 'Crear un nuevo usuario'})
    @ApiResponse({status:201, description:'Usuario creado exitosamente en DB' })
    @Roles(RolesEnum.ADMIN)
    create(@Body()body: CreateUserDTO) {
        return this.usersService.create(body)
    }
    @Put(':id')
    @ApiOperation({summary: 'Actualizar un usuario existente'})
    @ApiResponse({status:200, description:'Usuario actualizado en exitosamente en DB' })
    @Roles(RolesEnum.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.usersService.update(Number(id), body)
    }
    @Delete(':id')
    @ApiOperation({summary: 'Eliminar un usuario existente'})
    @Roles(RolesEnum.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(Number(id))
    }

}
