import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class PokemonService {

    // Pega os primeiros pokémons da lista geral
    async getAllPokemons(): Promise<PokemonDTO[]> {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
            const pokemons = response.data.results;

            const detailedPokemons: PokemonDTO[] = await Promise.all(
                pokemons.map(async (poke: { name: string; url: string }) => {
                    const detail = await axios.get(poke.url);
                    const data = detail.data;

                    return {
                        name: data.name,
                        types: data.types.map((t) => t.type.name),
                        abilities: data.abilities.map((a) => a.ability.name),
                    };
                }),
            );

            return detailedPokemons;
        } catch (error) {
            console.error('Erro ao buscar todos os pokémons:', error.message);
            throw new InternalServerErrorException('Erro ao buscar todos os pokémons');
        }
    }

    // Pega um pokémon específico pelo nome
    async getPokemonByName(name: string): Promise<PokemonDTO> {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const data = response.data;

            return {
                name: data.name,
                types: data.types.map((t) => t.type.name),
                abilities: data.abilities.map((a) => a.ability.name),
            };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(`Pokémon "${name}" não encontrado.`);
            }
            throw new InternalServerErrorException('Erro ao buscar detalhes do Pokémon');
        }
    }
}
