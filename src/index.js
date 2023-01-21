import './sass/main.scss';
import {ApiFetch}  from "./js/api_serv";
import API from "./js/fetchCountries";
import { throttle } from 'throttle-debounce';
import country from './templates/country.hbs';
import country_list from './templates/country_list.hbs';
import images from "./templates/images.hbs";
import Notiflix from 'notiflix';
import {refs} from "./js/getRefs";
import articles from "./templates/articles.hbs";




const DEBOUNCE_DELAY = 500;


// refs.input.addEventListener('keyup',throttle(DEBOUNCE_DELAY,(event)=>{
//    const countryName =  event.target.value.trim();

//    if(countryName === ""){
//         clearPage();
//         return;
//    }

//    API.fetchCountries(countryName)
//         .then(renderData)
//         .catch((error) => {
//             clearPage();
//             Notiflix.Notify.failure("Ooops,there is no country with that name")
//         });
        
// }))


// function renderData(data){
        
//         if(data.length < 2){
//             clearPage();
//             const markup = country(data[0]);
//             refs.countryInfo.innerHTML = markup;
//         }
//         else if(data.length < 11){
//             clearPage();
//             let slicedData = data.slice(0,10);
//             const markup = country_list(slicedData);
//             refs.countryList.innerHTML = markup;
//          }
//         else if(data.length > 10){
//             clearPage();
//             Notiflix.Notify.info("To many matches found.Please specify name!")
//         }
//     }


// function clearPage(){
//     refs.countryInfo.innerHTML = "";
//     refs.countryList.innerHTML = "";
// }


// ======
// fetch API URL with additional params via new ULRSearchParams()
// =======
// 1 variant via URLSearchParams()
const pixabay = fetch('https://pixabay.com/api/?'+ new URLSearchParams({
    key:'32950836-9c0ce5402bfaddd9a8ff9a3e7',
    q:"mac",
    lang:"eng",
    image_type: "all",
    per_page:10,
})).then((response) => response.json());

// 2 variant via params

const options = {
    key:'32950836-9c0ce5402bfaddd9a8ff9a3e7',
    q:"iron man",
    lang:"eng",
    image_type: "all",
    per_page:10,
};
let url = 'https://pixabay.com/api/?';

let params = Object.entries(options)
        .map(([key,value]) => `${key}=${value}`)
        .join("&");


const pixabay = fetch(url + params)
        .then(r => r.json());
       
pixabay
    .then(renderPixabay)
    .catch((error) => Notiflix.Notify("Ooops, unable to find"));

    function renderPixabay(data){
        console.log(data);
        const markup = images(data.hits);
        refs.pixImgs.innerHTML = markup;
    }

