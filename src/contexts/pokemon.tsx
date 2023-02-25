import { useStorage } from 'hooks'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Pokemon, PokemonResponse, PokemonService } from 'services/pokemon'

export type PokemonContextType = {
  pokemons: Pokemon[]
  handleNext: () => void
  handlePrevious: () => void
  addPicked: (pokemon: Pokemon) => void
  handleSearch: (query: string) => void
  removePicked: (id: number) => void
  currentPage: number
  pickedPokemons: Pokemon[]
  notFound: boolean
  isLoading: boolean
  isPickedFull: boolean
}

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
)

export function PokemonProvider({ children }: React.PropsWithChildren) {
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pickedPokemons, setPickedPokemons] = useStorage<Pokemon[]>(
    'picked-pokemons',
    []
  )

  const pokemonService = new PokemonService()

  const handleResult = async (data: PokemonResponse) => {
    setIsLoading(true)
    setNext(data.next)
    setPrevious(data.previous)

    Promise.all(
      data.results.map(async result => {
        const response = await pokemonService.getByUrl(result.url)
        return response.data
      })
    )
      .then(setPokemons)
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  const handlePokemons = async (url?: string | null) => {
    const response = await pokemonService.get(url)
    await handleResult(response.data)
  }

  const handleNext = async () => {
    await handlePokemons(next).then(() => setCurrentPage(currentPage + 1))
  }

  const handlePrevious = async () => {
    if (currentPage === 1) return
    await handlePokemons(previous).then(() => setCurrentPage(currentPage - 1))
  }

  const handleSearch = async (query: string) => {
    setNotFound(false)
    setIsLoading(true)
    if (!query) return handlePokemons()

    await pokemonService
      .getByUrl(`/pokemon/${query}`)
      .then(response => {
        setPokemons([response.data])
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false))
  }

  const isPickedFull = useMemo(
    () => pickedPokemons.length === 6,
    [pickedPokemons]
  )

  const addPicked = (pokemon: Pokemon) => {
    if (isPickedFull) return
    setPickedPokemons([...pickedPokemons, pokemon])
  }

  const removePicked = (id: number) => {
    const filteredPokemons = pickedPokemons.filter(pokemon => pokemon.id !== id)
    setPickedPokemons(filteredPokemons)
  }

  useEffect(() => {
    handlePokemons()
  }, [])

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        handleNext,
        handlePrevious,
        currentPage,
        addPicked,
        removePicked,
        pickedPokemons,
        handleSearch,
        notFound,
        isLoading,
        isPickedFull
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = () => React.useContext(PokemonContext)
