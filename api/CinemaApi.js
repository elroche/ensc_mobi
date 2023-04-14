const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchCinemasApi = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/Cinemaapi/`);
    const cinemas = await response.json();
    return cinemas;
  } catch (e) {
    console.error("Erreur dans la récupération de tous les cinemas via l'API");
  }
};

export const fetchCinemaApi = async (cinemaId) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/Cinemaapi/${cinemaId}/getCinema`
    );
    const cinema = await response.json();
    return cinema;
  } catch (e) {
    console.error(
      "Erreur dans la récupération des données d'un cinema via l'API"
    );
  }
};

export const addCinema = async (
  _nom,
  _adresse,
  _codePostal,
  _ville,
  _responsable,
  _prixPlace
) => {
  try {
    const response = await fetch(`${rootEndpoint}/Cinemaapi/`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        adresse: _adresse,
        codePostal: _codePostal,
        ville: _ville,
        responsable: _responsable,
        prixPlace: _prixPlace,
      }),
    });
    const cinema = await response.json();
    return cinema;
  } catch (e) {
    console.error("Erreur dans la création d'un cinéma");
  }
};

export const editCinema = async (_id, _nom, _adresse, _codePostal, _ville, _responsable, _prixPlace) => {
  console.log("Prix d une place : " + typeof _prixPlace);
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
