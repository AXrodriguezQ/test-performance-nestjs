import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from './dto/paginate-results.dto';

@Injectable()
export class ResultsService {

  constructor(
    @InjectRepository(Result) private readonly resultsRepository: Repository<Result>
  ) {}

  async create(createResultDto: CreateResultDto) {
    try {

      this.resultsRepository.create(createResultDto);

      await this.resultsRepository.save(createResultDto);

      return createResultDto;
      
    } catch (error) {

      throw new HttpException('Error while creating results', HttpStatus.BAD_REQUEST);
      
    }
  }

  async findAll({ limit, offset }: PaginationQuery) {
    try {
      return await this.resultsRepository.find({ skip: offset, take: limit });
    } catch (error) {
      throw new HttpException('Error while loading results', HttpStatus.NO_CONTENT) 
    }
  }

  async findOne(id: number) {
    const query = this.resultsRepository.createQueryBuilder('result')
      .where('player.id = :id', { id })

    const result = await query.getOne();

    if ( !result ) throw new HttpException('result not found', HttpStatus.NOT_FOUND);

    return result
  }

  remove(id: number) {
    try {
      
      this.resultsRepository.softDelete(id);

    } catch (error) {
      
      throw new HttpException('Error while deleting result', HttpStatus.BAD_REQUEST);

    }
  }
}
