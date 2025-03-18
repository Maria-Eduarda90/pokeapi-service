import { Controller, Get } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get('fire')
    async getFirePokemons(): Promise<PokemonDTO[]> {
        return this.pokemonService.getFirePokemons();
    }
}
