// Définition de la racine de l'URL de l'API
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

export const editMovieRoomApi = async (
  _id,
  _cinemaId,
  _nbPlace,
  _numeroSalle
) => {
  const cinemaId = parseInt(_cinemaId);
  const nbPlace = parseInt(_nbPlace);
  const numeroSalle = parseInt(_numeroSalle);

  try {
    const response = await fetch(`${rootEndpoint}/Salleapi/${_id}/`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: _id,
        CinemaId: cinemaId,
        NbPlace: nbPlace,
        NumeroSalle: numeroSalle,
      }),
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addMovieRoomApi = async (cinemaId, nbPlace, numeroSalle) => {
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

export const deleteMovieRoomApi = async (movieRoomId) => {
  try {
    const response = await fetch(`${rootEndpoint}/Salleapi/${movieRoomId}`, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la salle");
    }
    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : null;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
