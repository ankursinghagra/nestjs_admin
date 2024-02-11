import { Body, Controller, Get, Post } from '@nestjs/common';
import { threadId } from 'worker_threads';
import { createUserDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { User } from 'src/admin/dto/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private datasource: DataSource,
        @InjectRepository(User) private usersRepo: Repository<User>
    ){}

    @Get('')
    getAll(){
        return this.userService.findAll();
    }

    @Post('')
    async addUser(@Body() createUserDTO: createUserDTO ){
        const user = new User();
        //console.log(createUserDTO);
        if( !createUserDTO.u_username || !createUserDTO.u_email || !createUserDTO.u_firstname || !createUserDTO.u_lastname ){
            return {statusCode: 400, error: "Bad Request", message: 'Missing Entries'};
        }
        user.u_username = createUserDTO.u_username;
        user.u_email = createUserDTO.u_email;
        user.u_firstname = createUserDTO.u_firstname;
        user.u_lastname = createUserDTO.u_lastname;

        const query = await this.datasource.getRepository(User).createQueryBuilder("user").where("user.u_username = :u", {u:user.u_username}).getOne();
        if(query){
            return {statusCode: 400, error: "Bad Request", message: 'Username Taken'};
        }
        const query2 = await this.datasource.getRepository(User).createQueryBuilder("user").where("user.u_email = :em", {em:user.u_email}).getOne();
        if(query2){
            return {statusCode: 400, error: "Bad Request", message: 'Email Taken'};
        }

        if (this.userService.create(user)){
            return {status: true, message: "Entries Saved"};
        }else{
            return {statusCode: 400, error: "Bad Request", message: 'DB rejected'};
        }
    }
}
