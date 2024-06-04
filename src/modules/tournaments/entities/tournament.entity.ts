import { Player } from "src/modules/players/entities/player.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Player, (player) => player.tournament)
    players: Player[]
    
    @DeleteDateColumn()
    deletedAt: Date;

}
