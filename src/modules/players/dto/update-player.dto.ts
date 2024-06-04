import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePlayerDto {

    @IsString()
    @IsOptional()
    position: string;
    
    @IsNumber()
    @IsOptional()
    gamesPlayed: number;
    
    @IsNumber()
    @IsOptional()
    totalGoals: number;

}
