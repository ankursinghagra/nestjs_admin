
import { IsEmail } from "class-validator";

export class createUserDTO {
    u_username: string;
    @IsEmail()
    u_email: string;
    u_firstname: string;
    u_lastname: string;
}