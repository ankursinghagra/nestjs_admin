export enum UserRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    EDITOR = "editor",
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin_users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    uid: number;

    @Column("varchar", { length: 200 })
    u_username: string;
    
    @Column("varchar", { length: 200 })
    u_email: string;

    @Column("varchar", {default: null})
    u_password: string;
    
    @Column("varchar", { length: 200, default: null })
    u_firstname: string;
    
    @Column("varchar", { length: 200, default: null })
    u_lastname: string;

    @Column("varchar", { length: 200, default: null })
    u_hash_verification: string;

    @Column("enum" ,{enum: UserRole, default: UserRole.EDITOR})
    u_userrole: string;
    
    @Column("varchar", { length: 200, default: null })
    u_photo: string;
    
    
} 