import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationQuery } from './dto/paginate-results.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiBody({
    type: CreateResultDto,
    description: 'Create result using result dto. ',
    examples: {
      example1:{
        value:{
          name: 'Messi',
          dorsal: 10,
          age: 33,
          position: 'delantero',
          nationality: 'Argentina',
          gamesPlayed: 10,
          totalGoals: 30
        }
      }
      
    }
  })
  @ApiOperation({ summary: 'Create a result' })
  @ApiResponse({status: 201, description: 'result created successfully!!'})
  @ApiResponse({status: 400, description: 'The data entered to create the result is invalid.'})  
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
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
  @ApiOperation({ summary: 'See all results' })
  @ApiResponse({ status: 200, description: 'results' })
  @ApiResponse({ status: 404, description: 'The results does not exist'})
  @Get()
  findAll(@Query() pagination: PaginationQuery) {
    return this.resultsService.findAll(pagination);
  }

  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter a player will be searched by his id',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'See a results' })
  @ApiResponse({ status: 200, description: 'results' })
  @ApiResponse({ status: 404, description: 'The results does not exist'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter you can define which result is the one you are going to delete.',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Delete a result' })
  @ApiResponse({ status: 200, description: 'result deleted' })
  @ApiResponse({ status: 404, description: 'The result does not exist'})
  @ApiResponse({ status: 400, description: 'The data entered to delete the result is invalid.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
  
}
