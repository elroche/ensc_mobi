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

export const editMovieRoom = async (_id, _cinemaId, _nbPlace, _numeroSalle) => {
  console.log("Salle Id : " + typeof _id);
  console.log("Cinema Id : " + typeof _cinemaId);
  console.log("Nombre de place : " + typeof _nbPlace);
  console.log("Numero de la salle : " + typeof _numeroSalle);
  try {
    const response = await fetch(`${rootEndpoint}/Salleapi/${_id}/`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        cinemaId: _cinemaId,
        nbPlace: _nbPlace,
        numeroSalle: _numeroSalle,
      }),
    });
    
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addMovieRoom = async (cinemaId, nbPlace, numeroSalle) => {
  try {
    console.log("Id du ciné : " + cinemaId);
    console.log("Nombre d eplace : " + nbPlace);
    console.log("Numero de la salle : " + numeroSalle);
    const response = await fetch(`${rootEndpoint}/Salleapi/`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cinemaId: cinemaId,
        nbPlace: nbPlace,
        numeroSalle: numeroSalle,
      }),
    });
    const movieRoom = await response.json();
    return movieRoom;
  } catch (e) {
    console.error("Erreur dans la création d'une salle");
  }
};
