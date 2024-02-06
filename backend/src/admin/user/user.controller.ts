import { Body, Controller, Get, Post } from '@nestjs/common';
import { threadId } from 'worker_threads';
import { createUserDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get('')
    getAll(){
        return this.userService.findAll();
    }

    @Post('')
    addUser(@Body() createUserDTO: createUserDTO ){
        return this.userService.create(createUserDTO);
    }
}
