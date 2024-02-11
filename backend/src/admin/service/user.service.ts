import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/admin/dto/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>
    ){}

    create(user: object){
        this.usersRepo.save(user);
        return true;
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
