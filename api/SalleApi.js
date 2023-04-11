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
