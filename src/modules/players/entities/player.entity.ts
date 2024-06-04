import { Tournament } from "src/modules/tournaments/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dorsal: number;

  @Column()
  age: number;

  @Column()
  position?: string;

  @Column()
  nationality?: string;

  @Column({ default: 0 })
  gamesPlayed: number;

  @Column({ default: 0 })
  totalGoals: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.players)
  tournament: Tournament;
  
  @DeleteDateColumn()
  deletedAt: Date;

}
