export type PokemonResponse = {
  next: string
  previous: string | null
  count: number
  results: PokemonResponseResult[]
}

export type PokemonResponseResult = {
  name: string
  url: string
}

export type RemotePokemonResponse = {
  next: string
  previous: string
  pokemons: Pokemon[]
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
