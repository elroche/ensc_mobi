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

export const addSeance = async (_date, _filmId, _salleId, _cinemaId) => {
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
        nbPlaceAchete: 0,
      }),
    });
    const seance = await response.json();
    return seance;
  } catch (e) {
    console.error("Erreur dans la création d'une séance de film");
  }
};
