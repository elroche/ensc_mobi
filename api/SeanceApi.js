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
