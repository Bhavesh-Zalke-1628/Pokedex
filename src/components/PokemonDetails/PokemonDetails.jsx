import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetailes() {
    const { id } = useParams();
    console.log(id);
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    async function downloadPokemon() {
        setIsLoading(true)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(res.data);
        setPokemon({
            name: res.data.name,
            image: res.data.sprites.other.dream_world.front_default,
            weight: res.data.weight,
            height: res.data.height,
            types: res.data.types.map((t) => t.type.name),
        });
        setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <p className="text-2xl font-semibold text-blue-500 animate-pulse">
                            Loading...
                        </p>
                    </div>
                    :
                    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                        {console.log(pokemon)}
                        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                            <h1 className="text-2xl font-bold mb-4 capitalize">
                                {pokemon.name}
                            </h1>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-semibold">Weight:</span> {pokemon.weight}
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-semibold">Height:</span> {pokemon.height}
                            </div>
                            <div className="text-gray-700">
                                <span className="font-semibold">Types:</span>
                                <div className="flex justify-center gap-2 mt-2">
                                    {pokemon?.types?.map((p, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
                                        >
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default PokemonDetailes;
