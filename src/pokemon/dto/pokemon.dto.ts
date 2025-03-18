import { ApiProperty } from "@nestjs/swagger";

export class PokemonDTO {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: [String] })
    types: string[];

    @ApiProperty({ type: [String] })
    abilities: string[];
}