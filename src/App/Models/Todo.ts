import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    description: string

    @Column({type: "boolean", default: true})
    open: boolean

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date
};