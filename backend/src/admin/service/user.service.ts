import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/admin/dto/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>
    ){}

    create(createUserDTO: createUserDTO){
        const user = new User();
        if(createUserDTO.u_username == null || createUserDTO.u_email == null || createUserDTO.u_firstname == null || createUserDTO.u_lastname == null){
            return {statusCode: 400, error: "Bad Request", message: 'Missing Entries'};
        }
        user.u_username = createUserDTO.u_username;
        user.u_email = createUserDTO.u_email;
        user.u_firstname = createUserDTO.u_firstname;
        user.u_lastname = createUserDTO.u_lastname;
        this.usersRepo.save(user);
        return {status: true, message: "Entries Saved"};
    }

    findAll(): Promise<User[]>{
        return this.usersRepo.find();
    }

    findOne(uid: any): Promise<User | null> {
        return this.usersRepo.findOneBy({ uid });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
