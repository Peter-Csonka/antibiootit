export default async function GetRecommendedTreatment(props) {
    console.log(props);
    const apikey = process.env.REACT_APP_API_KEY;
    const url = "https://backend-production-0993.up.railway.app/api/antibiotics/dose-calculation";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apikey
        },
        body: JSON.stringify(props)
    }
    
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid or missing API key");
            } else if (response.status === 400) {
                throw new Error("Invalid request parameters");
            } else if (response.status === 404) {
                throw new Error("Resource not found");
            } else if (response.status === 500) {
                throw new Error("Internal server error");
            } else {
                throw new Error("Unknown error occurred");
            }
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data;
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred");
    }
}            