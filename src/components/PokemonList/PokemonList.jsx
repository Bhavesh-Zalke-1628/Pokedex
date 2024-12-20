import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    // const [pokedexUri, setPokedexUri] = useState("https://pokeapi.co/api/v2/pokemon");
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [prevUrl, setPrevUrl] = useState('')
    // const [nextUrl, setNextUrl] = useState('')

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUri: "https://pokeapi.co/api/v2/pokemon",
        prevUrl: '',
        nextUrl: ''
    })

    async function getData() {

        // setIsLoading(true)

        setPokemonListState({ ...pokemonListState, isLoading: true })

        const { data } = await axios.get(pokemonListState.pokedexUri);
        const pokemonResult = data.results; // we get array of pokemon

        // setNextUrl(data.next)
        setPokemonListState({ ...pokemonListState, nextUrl: data.next })

        // setPrevUrl(data.previous)
        setPokemonListState({ ...pokemonListState, prevUrl: data.previous })

        const pokemonResultPromise = pokemonResult.map((e) => axios.get(e.url));
        const pokemonData = await axios.all(pokemonResultPromise);

        const PokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            };
        });

        // setPokemonList(PokeListResult);
        setPokemonListState({
            ...pokemonListState,
            pokemonList: PokeListResult,
            isLoading: false
        })
        //    both call in the same state 

        // setIsLoading(false);
        // setPokemonListState({ ...pokemonListState, isLoading: false })

    }

    useEffect(() => {
        getData();
    }, [pokemonListState.pokedexUri]);

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4 text-center">Pokémon List</h1>
            {pokemonListState.isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pokemonListState.pokemonList.map((pokemon) => (
                        <Pokemon
                            name={pokemon.name}
                            image={pokemon.image}
                            key={pokemon.id}
                            id={pokemon.id}
                        />

                    ))}
                </div>
            )}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    // onClick={() => pokemonListState.prevUrl(prevUrl)}
                    onClick={() => setPokemonListState({ ...pokemonListState, pokedexUri: pokemonListState.prevUrl })}
                    disabled={pokemonListState.prevUrl == null}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl == null}
                    onClick={() => setPokemonListState({ ...pokemonListState, pokedexUri: pokemonListState.nextUrl })}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
