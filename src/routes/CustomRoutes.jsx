import { Route, Routes } from "react-router-dom"
import Pokedex from "../components/Pokedex/Pokedex"
import PokemonDetailes from "../components/PokemonDetails/PokemonDetails"

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetailes />} />
        </Routes >
    )
}


export default CustomRoutes