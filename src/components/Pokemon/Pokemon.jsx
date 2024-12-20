import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
    return (
        <Link to={`/pokemon/${id}`}>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                <div className="text-xl font-bold mb-2 capitalize">{name}</div>
                <div>
                    <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 object-contain"
                    />
                </div>
            </div>
        </Link>

    );
}

export default Pokemon;
