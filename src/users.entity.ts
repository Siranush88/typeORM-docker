import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    gender: string

    @Column()
    status: boolean

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}