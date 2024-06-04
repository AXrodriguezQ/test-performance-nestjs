import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationQuery } from './dto/pagination-player.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags ('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @ApiBody({
    type: CreatePlayerDto,
    description: 'Create player using plyer dto. ',
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
  @ApiOperation({ summary: 'Create a player' })
  @ApiResponse({status: 201, description: 'Player created successfully!!'})
  @ApiResponse({status: 400, description: 'The data entered to create the player is invalid.'})  
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
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
  @ApiOperation({ summary: 'See all players' })
  @ApiResponse({ status: 200, description: 'Players' })
  @ApiResponse({ status: 404, description: 'The player does not exist'})
  @Get()
  findAll(@Query() pagination: PaginationQuery) {
    return this.playersService.findAllPlayers(pagination);
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
  @ApiOperation({ summary: 'See a player' })
  @ApiResponse({ status: 200, description: 'Players' })
  @ApiResponse({ status: 404, description: 'The player does not exist'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }
  
  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter you can define which player is the one you are going to edit.',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiBody({
    type: UpdatePlayerDto,
    description: 'Update player using plyer dto.',
    examples: {
      example1:{
        value:{
          position: 'delantero',
          gamesPlayed: 11,
          totalGoals: 32
        }
      }
      
    }
  })
  @ApiOperation({ summary: 'Update a player' })
  @ApiResponse({ status: 200, description: 'Players' })
  @ApiResponse({ status: 404, description: 'The player does not exist'})
  @ApiResponse({ status: 400, description: 'The data entered to update the player is invalid.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }
  
  @ApiParam({
    name:'id',
    type:'number',
    required: true,
    description: 'With this parameter you can define which player is the one you are going to delete.',
    examples:{
      example1:{
        value:1
      }
    } 
  })
  @ApiOperation({ summary: 'Delete a player' })
  @ApiResponse({ status: 200, description: 'Player deleted' })
  @ApiResponse({ status: 404, description: 'The player does not exist'})
  @ApiResponse({ status: 400, description: 'The data entered to delete the player is invalid.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
