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
        console.log("date : " + _date);
        console.log("id du ciné : " + _cinemaId);
        console.log("id du film : " + _filmId);
        console.log("id de la salle : " + _salleId);
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