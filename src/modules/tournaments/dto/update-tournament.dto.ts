import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTournamentDto {

    @IsString()
    @IsNotEmpty()
    name: string;

}
