import { httpClient } from 'config/http-client'
import { Pokemon, PokemonResponse } from 'models/pokemon'

export class PokemonService {
  public async get(url?: string, limit = 16) {
    return await httpClient.get<PokemonResponse>(url || '/pokemon', {
      params: { limit }
    })
  }

  public async getDetails(url: string) {
    return await httpClient.get<Pokemon>(url)
  }
}

export const pokemonService = new PokemonService()
