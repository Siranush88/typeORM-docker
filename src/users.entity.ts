import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    @Column()
    created: Date

    @Column()
    updated: Date
}