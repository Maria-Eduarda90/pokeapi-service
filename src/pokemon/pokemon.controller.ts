import { Controller, Get } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get('fire')
    @ApiOkResponse({ description: 'Lista de pokémons do tipo Fire', type: [PokemonDTO] })
    async getFirePokemons(): Promise<PokemonDTO[]> {
        return this.pokemonService.getFirePokemons();
    }
}
