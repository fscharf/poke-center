import { httpClient } from 'config/http-client'

export type PokemonResponse = {
  next: string | null
  previous: string | null
  count: number
  results: PokemonResponseResult[]
}

export type PokemonResponseResult = {
  name: string
  url: string
}

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  sprites: PokemonSprites
}

export type PokemonSprites = {
  front_default: string
}

export class PokemonService {
  public async get(url?: string | null, limit = 16) {
    return await httpClient.get<PokemonResponse>(url || '/pokemon', {
      params: { limit }
    })
  }

  public async getByUrl(url: string) {
    return await httpClient.get<Pokemon>(url)
  }
}
