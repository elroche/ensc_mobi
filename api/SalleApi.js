const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchSallesApi = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/Sallesapi/`);
    const salles = await response.json();
    return salles;
  } catch (e) {
    console.error("Erreur dans la récupération de toutes les salles via l'API");
  }
};

export const addMovieRoom = async (_cinemaId, _nbPlace, _numeroSalle) => {
  try {
    const response = await fetch(`${rootEndpoint}/`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cinemaId: _cinemaId,
        nbPlace: _nbPlace,
        numeroSalle: _numeroSalle,
      }),
    });
    const movieRoom = await response.json();
    return movieRoom;
  } catch (e) {
    console.error("Erreur dans la création d'une salle");
  }
};
