import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from './dto/pagination-player.dto';

@Injectable()
export class PlayersService {

  constructor ( 
    @InjectRepository(Player) private readonly playersRepository: Repository<Player>
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    
    try {

      if ( createPlayerDto.id ) {

        const verify = await this.playersRepository.findOneBy({ id: createPlayerDto.id })
      
        if ( verify ) {
          throw new HttpException('Player already exists', HttpStatus.BAD_REQUEST);
        }

      } 

      this.playersRepository.create(createPlayerDto);

      await this.playersRepository.save(createPlayerDto);

      return createPlayerDto;
      
    } catch (error) {

      throw new HttpException('Error while creating player', HttpStatus.BAD_REQUEST);
      
    }

  }

  async findAll({ limit, offset }: PaginationQuery): Promise<Player[]> {
    try {
      return await this.playersRepository.find({ relations: ['tournament'], skip: offset, take: limit });
    } catch (error) {
      throw new HttpException('Error while loading players', HttpStatus.NO_CONTENT) 
    }
  }

  async findOne(id: number) {
    const query = this.playersRepository.createQueryBuilder('player')
      .leftJoinAndSelect('player.tournament', 'tournament')
      .where('player.id = :id', { id })

    const player = await query.getOne();

    if ( !player ) throw new HttpException('Player not found', HttpStatus.NOT_FOUND);

    return player
  }

  async update(id: number, { position, gamesPlayed, totalGoals }: UpdatePlayerDto) {
    try {
    
      const player: Player = await this.playersRepository.preload({
        id,
        position,
        gamesPlayed,
        totalGoals,
      });
  
      if (!player) throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  
      await this.playersRepository.save(player);
      return player;
      
    } catch (error) {
    
      throw new HttpException('Error while updating player', HttpStatus.BAD_REQUEST);
    
    }
  }

  remove(id: number) {
    
    try {
      
      this.playersRepository.softDelete(id);

    } catch (error) {
      
      throw new HttpException('Error while deleting player', HttpStatus.BAD_REQUEST);

    }

  }
}
