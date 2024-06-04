import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResultDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    result: string;

}
