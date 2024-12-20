import { useEffect, useState } from "react"
import React from "react"
import axios from "axios"
import Pokemon from "../Pokemon/Pokemon"

function PokemonList() {

    const POKEDEX_URI = "https://pokeapi.co/api/v2/pokemon"
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    async function getData() {
        const { data } = await axios.get(POKEDEX_URI)
        const pokemonResult = await data.results //we get arrya of pokemon
        console.log(pokemonResult.url)


        const pokemonResultPromise = pokemonResult.map((e) => axios.get(e.url))
        const pokemonData = await axios.all(pokemonResultPromise)

        console.log(pokemonData)

        const PokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            console.log(pokemon)
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        }))
        console.log(PokeListResult)
        setPokemonList(PokeListResult)
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            list
            {
                (isLoading) ? "Loaindg...." :
                    pokemonList.map((pokemon) => {
                        return <Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id} />
                    })
            }
        </div>
    )
}

export default PokemonList