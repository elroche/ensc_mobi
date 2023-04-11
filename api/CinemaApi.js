const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchCinemasApi = async() => {
    try {
        const response = await fetch(`${rootEndpoint}/Cinemaapi/`);
        const cinemas = await response.json();
        return cinemas;
    } catch (e) {
        console.error("Erreur dans la récupération de tous les cinemas via l'API");
    }
};

export const fetchCinemaApi = async(cinemaId) => {
    try {
        const response = await fetch(`${rootEndpoint}/Cinemaapi/${cinemaId}/getCinema`);
        const cinema = await response.json();
        return cinema;
    } catch (e) {
        console.error("Erreur dans la récupération des données d'un cinema via l'API");
    }
};