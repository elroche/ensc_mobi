const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchSeancesApi = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/Seanceapi/`);
    const seances = await response.json();
    return seances;
  } catch (e) {
    console.error(
      "Erreur dans la récupération de toutes les séances via l'API"
    );
  }
};

export const addMovieSession = async (
  _filmId,
  _salleId,
  _cinemaId,
  _date,
  _nbPlaceAchete
) => {
  try {
    const response = await fetch(`${rootEndpoint}/`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filmId: _filmId,
        salleId: _salleId,
        cinemaId: _cinemaId,
        date: _date,
        nbPlaceAchete: _nbPlaceAchete,
      }),
    });
    const movieSession = await response.json();
    return movieSession;
  } catch (e) {
    console.error("Erreur dans la création d'une session de film");
  }
};
