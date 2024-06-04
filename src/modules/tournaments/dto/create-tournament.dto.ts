import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

}
