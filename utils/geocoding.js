// Geocoding helper using Nominatim (OpenStreetMap).
// Free service, no API key required. Must respect Nominatim usage policy
// (one request per second, identify app with a `User-Agent`).

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";

async function geocode(location, country) {
    try {
        const query = `${location}, ${country}`;
        const params = new URLSearchParams({
            q: query,
            format: "json",
            limit: "1",
        });

        const response = await fetch(`${NOMINATIM_BASE}?${params.toString()}`, {
    headers: {
        "User-Agent": "wanderlust-app",
        "Accept": "application/json",
    },
});

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return null;
        }

        const { lat, lon } = data[0];

        return {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
        };
    } catch (err) {
        // Never crash the app if geocoding fails.
        return null;
    }
}

module.exports = { geocode };
