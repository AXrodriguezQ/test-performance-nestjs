import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from './dto/pagination-results.dto';

@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    try {

      if ( createTournamentDto.id ) {

        const verify = await this.tournamentRepository.findOneBy({ id: createTournamentDto.id })
      
        if ( verify ) {
          throw new HttpException('Player already exists', HttpStatus.BAD_REQUEST);
        }

      } 

      this.tournamentRepository.create(createTournamentDto);

      await this.tournamentRepository.save(createTournamentDto);

      return createTournamentDto;
      
    } catch (error) {

      throw new HttpException('Error while creating tournament', HttpStatus.BAD_REQUEST);
      
    }  }

  async findAll({ limit, offset }: PaginationQuery) {
    try {
      return await this.tournamentRepository.find({ relations: ['players'], skip: offset, take: limit });
    } catch (error) {
      throw new HttpException('Error while loading tournaments', HttpStatus.NO_CONTENT) 
    }
  }

  async findOne(id: number) {
    const query = this.tournamentRepository.createQueryBuilder('tournament')
      .leftJoinAndSelect('tournament.players', 'tournament')
      .where('tournament.id = :id', { id })

    const tournament = await query.getOne();

    if ( !tournament ) throw new HttpException('tournament not found', HttpStatus.NOT_FOUND);

    return tournament
  }

  async update(id: number, { name }: UpdateTournamentDto) {
    try {
    
      const tournament: Tournament = await this.tournamentRepository.preload({
        id,
        name
      });
  
      if (!tournament) throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
  
      await this.tournamentRepository.save(tournament);
      return tournament;
      
    } catch (error) {
    
      throw new HttpException('Error while updating Tournament', HttpStatus.BAD_REQUEST);
    
    }
  }

  remove(id: number) {
    try {
      
      this.tournamentRepository.softDelete(id);

    } catch (error) {
      
      throw new HttpException('Error while deleting tournament', HttpStatus.BAD_REQUEST);

    }
  }
}
