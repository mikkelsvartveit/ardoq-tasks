function loadStations() {
    fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
        {
            headers: { "Client-Identifier": "testfirma-stasjonstatus" }
        })

        .then(response => response.json())

        .then(function (response) {
            const stations = response.data.stations;
            // Sorting the stations alphabetically by name
            stations.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
            const stationsSelectElement = document.getElementById("stations_select");

            for (station of stations) {
                const optionElement = document.createElement("option");
                optionElement.value = station.station_id;
                optionElement.innerHTML = station.name;

                stationsSelectElement.appendChild(optionElement);
            }
        })

        .catch(function () {
            console.error("Failed to load station status. Please try again.")
        })
}

function loadStatus() {
    fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
        {
            headers: { "Client-Identifier": "testfirma-stasjonstatus" }
        })

        .then(response => response.json())

        .then(function (response) {
            const stations = response.data.stations;
            const stationsSelectElement = document.getElementById("stations_select");
            const stationId = stationsSelectElement.value;
            if (stationId != 0) {
                const stationObject = stations.find(station => station.station_id == stationId);

                const availableBikesElement = document.getElementById("available_bikes");
                const freeSpotsElement = document.getElementById("free_spots");

                availableBikesElement.innerHTML = stationObject.num_bikes_available;
                freeSpotsElement.innerHTML = stationObject.num_docks_available;

                const statusElement = document.getElementById("status");
                statusElement.classList.remove("hidden");
            }
        })

        .catch(function () {
            console.error("Failed to load station status. Please try again.");
        })
}

// Load stations on page load
loadStations();

// Auto-refresh status every 10 seconds
setInterval(loadStatus, 10000);

// Loads status when changing station in dropdown
document.getElementById("stations_select").addEventListener("change", loadStatus);