import { Controller, Get, Param } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import { PokemonService } from './pokemon.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    @ApiOkResponse({ description: 'Lista dos primeiros Pokémons', type: [PokemonDTO] })
    async getAll(): Promise<PokemonDTO[]> {
        return this.pokemonService.getAllPokemons();
    }

    @Get(':name')
    @ApiParam({ name: 'name', description: 'Nome do Pokémon' })
    @ApiOkResponse({ description: 'Detalhes de um Pokémon pelo nome', type: PokemonDTO })
    async getByName(@Param('name') name: string): Promise<PokemonDTO> {
        return this.pokemonService.getPokemonByName(name);
    }
}
