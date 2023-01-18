export  default {fetchCountries};

function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => {
        console.log(response);
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json()
    });
}





