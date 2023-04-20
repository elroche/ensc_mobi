const rootEndpoint = "https://ensccinema.azurewebsites.net/api/Filmapi";

export const fetchMoviesApi = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/`);
    const movies = await response.json();
    return movies;
  } catch (e) {
    console.error("Erreur dans la récupération de tous les films via l'API");
  }
};

export const fetchMovieApi = async (movieId) => {
  try {
    const response = await fetch(`${rootEndpoint}/${movieId}`);
    const movie = await response.json();
    return movie;
  } catch (e) {
    console.error(
      "Erreur dans la récupération des données d'un film via l'API"
    );
  }
};

export const addMovie = async (
  _nom,
  _realisateur,
  _resume,
  _genre,
  _date,
  _duree
) => {
  try {
    const response = await fetch(`${rootEndpoint}/`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        realisateur: _realisateur,
        resume: _resume,
        genre: _genre,
        duree: _duree,
      }),
    });
    const movie = await response.json();
    return movie;
  } catch (e) {
    console.error("Erreur dans la création d'un film");
  }
};

export const deleteMovieApi = async (movieId) => {
  try {
    const response = await fetch(`${rootEndpoint}/${movieId}`, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
    });
    const movie = await response.json();
    return movie;
  } catch (e) {
    console.error("Erreur dans la suppression d'un film");
  }
};
