import Search from '../../Search/Search'
import PokemonList from '../PokemonList/PokemonList'


function Pokedex() {
    return (
        <div className=" py-2 w-full h-26 flex gap-5 items-center justify-center flex-col">
            <h1 className=" text-4xl capitalize mt-4">
                pokedex
            </h1>
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex