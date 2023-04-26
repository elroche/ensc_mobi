// Définition de la racine de l'URL de l'API
const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

// Récupération de tous les cinémas de l'API
export const fetchCinemasApi = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/Cinemaapi/`);
    const cinemas = await response.json();
    return cinemas;
  } catch (e) {
    console.error("Erreur dans la récupération de tous les cinemas via l'API");
  }
};

// Récupération d'un cinéma de l'API en fonction de son identifiant
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

// Récupération de tous les cinémas de l'API en fonction d'une ville
export const fetchCinemasByVilleApi = async (ville) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/Cinemaapi/${ville}/getCinemas`
    );
    const cinema = await response.json();
    return cinema;
  } catch (e) {
    console.error(
      "Erreur dans la récupération des données d'un cinema via l'API"
    );
  }
};

// Création d'un cinéma
export const addCinemaApi = async (
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

// Modification d'un cinéma
export const editCinemaApi = async (
  _id,
  _nom,
  _adresse,
  _codePostal,
  _ville,
  _responsable,
  _prixPlace
) => {
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
        responsable: _responsable,
        prixPlace: _prixPlace,
      }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
