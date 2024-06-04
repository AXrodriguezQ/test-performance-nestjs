import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    dorsal: number;
    
    @IsNumber()
    @IsNotEmpty()
    age: number;
    
    @IsString()
    @IsOptional()
    position: string;
    
    @IsString()
    @IsOptional()
    nationality: string;
    
    @IsNumber()
    @IsOptional()
    gamesPlayed: number;
    
    @IsNumber()
    @IsOptional()
    totalGoals: number;

}
