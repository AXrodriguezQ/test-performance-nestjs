import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    result: string;

}
