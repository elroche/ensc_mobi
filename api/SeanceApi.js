const rootEndpoint = "https://ensccinema.azurewebsites.net/api";

export const fetchSeancesApi = async() => {
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

export const addSeanceApi = async(_date, _filmId, _salleId, _cinemaId) => {
    try {
        const response = await fetch(`${rootEndpoint}/Seanceapi/`, {
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
        console.error("Erreur dans la création d'une séance");
    }
};

export const editSeanceApi = async (_id, _date, _filmId, _salleId, _cinemaId) => {
  try {
    const response = await fetch(`${rootEndpoint}/Seanceapi/${_id}/`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: _id,
        Date: _date,
        FilmId: _filmId,
        SalleId: _salleId,
        CinemaId: _cinemaId,
      }),
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteSeanceApi = async (seanceId) => {
  console.log(seanceId);
  try {
    const response = await fetch(`${rootEndpoint}/Seanceapi/${seanceId}`, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
    });
    const seance = await response.json();
    return seance;
  } catch (e) {
    console.error("Erreur dans la suppression d'une séance");
  }
};