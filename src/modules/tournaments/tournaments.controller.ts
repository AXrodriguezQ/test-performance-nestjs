import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from './dto/pagination-results.dto';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {

  constructor(private readonly tournamentsService: TournamentsService) {}

  @ApiBody({
    type: CreateTournamentDto,
    description: 'Create tournament using tournament dto. ',
    examples: {
      example1:{
        value:{
          name: 'uefa champions league',
        }
      }
      
    }
  })
  @ApiOperation({ summary: 'Create a Tournament' })
  @ApiResponse({status: 201, description: 'Tournament created successfully!!'})
  @ApiResponse({status: 400, description: 'The data entered to create the tournament is invalid.'})  
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @ApiQuery({
    name:'limit',
    type:'number',
    required: false,
    description: 'With this parameter you can define how much data you want to see',
    examples:{
      limit:{
        value:2
      }
    } 
  })
  @ApiQuery({
    name:'offset',
    type:'number',
    required: false,
    description: 'With this parameter you can define how much data you want to skip or start your search.',
    examples:{
      offset:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'See all tournaments' })
  @ApiResponse({ status: 200, description: 'tournaments' })
  @ApiResponse({ status: 404, description: 'The tournament does not exist'})
  @Get()
  findAll(@Query() pagination: PaginationQuery) {
    return this.tournamentsService.findAll(pagination);
  }

  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter a tournament will be searched by his id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'See a tournament' })
  @ApiResponse({ status: 200, description: 'tournament' })
  @ApiResponse({ status: 404, description: 'The tournament does not exist'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter you can define which tournament is the one you are going to edit.',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiBody({
    type: UpdateTournamentDto,
    description: 'Update tournament using plyer dto.',
    examples: {
      example1:{
        value:{
          name: 'other name',
        }
      }
      
    }
  })
  @ApiOperation({ summary: 'Update a tournament' })
  @ApiResponse({ status: 200, description: 'tournament updated' })
  @ApiResponse({ status: 404, description: 'The tournament does not exist'})
  @ApiResponse({ status: 400, description: 'The data entered to update the tournament is invalid.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter you can define which tournament is the one you are going to delete.',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Delete a tournament' })
  @ApiResponse({ status: 200, description: 'tournament deleted' })
  @ApiResponse({ status: 404, description: 'The tournament does not exist'})
  @ApiResponse({ status: 400, description: 'The data entered to delete the tournament is invalid.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }
}
