import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { Tournament } from './entities/tournament.entity';
import { Player } from '../players/entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([Player, Tournament]) ],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
