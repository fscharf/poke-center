import { PokemonService } from 'services/pokemon'
import { httpClient } from 'config'
import { Pokemon, PokemonResponse } from 'models/pokemon'

describe('PokemonService', () => {
  const sut = new PokemonService()

  it('should return all pokemon data correctly', async () => {
    const data: PokemonResponse = {
      count: 20,
      next: 'https://test.com/2',
      previous: null,
      results: []
    }
    jest.spyOn(httpClient, 'get').mockResolvedValue({
      status: 200,
      data
    })
    const response = await sut.get()
    expect(response).toMatchObject({ status: 200, data })
  })

  it('should return a specific pokemon correctly', async () => {
    const data: Pokemon = {
      id: 1,
      base_experience: 20,
      name: 'bulbasaur',
      sprites: { front_default: 'test.png' }
    }
    jest.spyOn(httpClient, 'get').mockResolvedValue({
      status: 200,
      data
    })
    const response = await sut.getDetails('/pokemon/bulbasaur')
    expect(response).toMatchObject({ status: 200, data })
  })
})
