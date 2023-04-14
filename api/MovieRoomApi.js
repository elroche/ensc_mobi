const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchMovieRoomsApi = async (cinemaId) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/Salleapi/GetSallesCinema/${cinemaId}`
    );
    const movieRooms = await response.json();
    return movieRooms;
  } catch (e) {
    console.error(
      "Erreur dans la récupération des données d'une salle via l'API"
    );
  }
};

export const editMovieRoom = async (_id, _nom, _adresse, _codePostal, _ville, _responsable, _prixPlace) => {
  try {
    const response = await fetch(`${rootEndpoint}/CinemaApi/${_id}/`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id: _id,
        nom: _nom,
        adresse: _adresse,
        codePostal: _codePostal,
        ville: _ville,
        responsable : _responsable, 
        prixPlace : _prixPlace,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
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
