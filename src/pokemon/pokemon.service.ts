import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class PokemonService {
    async getFirePokemons(): Promise<PokemonDTO[]> {
        try {

            // buscando os pokémons do tipo fire
            const response: AxiosResponse<TypeApiResponse> = await axios.get('https://pokeapi.co/api/v2/type/fire');
            const firePokemons = response.data.pokemon.slice(0, 10);

            // buscando os detalhes de cada pokemon individualmente
            const detailedPokemons: PokemonDTO[] = await Promise.all(
                firePokemons.map(async (poke) => {
                    const detailResponse: AxiosResponse<PokemonDetail> = await axios.get(poke.pokemon.url);
                    const data = detailResponse.data;

                    return {
                        name: data.name,
                        types: data.types.map((t) => t.type.name),
                        abilities: data.abilities.map((a) => a.ability.name),
                    };
                }),
            );

            return detailedPokemons;
        } catch (error) {
            console.error('Erro ao buscar pokémons:', error.message);
            throw new InternalServerErrorException('Erro ao processar dados da PokeAPI');
        }
    }
}
