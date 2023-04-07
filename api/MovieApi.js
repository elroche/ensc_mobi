const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchMoviesApi = async() => {
    try {
        const response = await fetch(`${rootEndpoint}/Filmapi/`);
        const movies = await response.json();
        return movies;
    } catch (e) {
        console.error("Erreur dans la récupération de tous les films via l'API");
    }
};

export const fetchMovieApi = async(filmId) => {
    try {
        const response = await fetch(`${rootEndpoint}/Filmapi/${filmId}`);
        const movie = await response.json();
        return movie;
    } catch (e) {
        console.error("Erreur dans la récupération des données d'un film via l'API");
    }
};