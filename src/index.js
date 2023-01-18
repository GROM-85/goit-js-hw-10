import './sass/main.scss';
import {fetchCountries} from "./fetchCountries";
import { throttle } from 'throttle-debounce';
import country from './templates/country.hbs';
import country_list from './templates/country_list.hbs'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;
const input = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list")

input.addEventListener('keyup',throttle(DEBOUNCE_DELAY,(event)=>{
   const countryName =  event.target.value.trim();

   if(countryName === ""){
        clearPage();
        return;
   }

   fetchCountries(countryName)
        .then(renderData)
        .catch((error) => {
            clearPage();
            Notiflix.Notify.failure("Ooops,there is no country with that name")
        });
        
}))


function renderData(data){
        
        if(data.length < 2){
            clearPage();
            const markup = country(data[0]);
            countryInfo.innerHTML = markup;
        }
        else if(data.length < 11){
            clearPage();
            let slicedData = data.slice(0,10);
            const markup = country_list(slicedData);
            countryList.innerHTML = markup;
         }
        else if(data.length > 10){
            clearPage();
            Notiflix.Notify.info("To many matches found.Please specify name!")
        }
    }


function clearPage(){
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}

