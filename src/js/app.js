
import { PixabayAPI } from "./pixabay-app.js";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { createMarkUp } from "./createmarkup.js";


const refs = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".js-searh-form"),
    searchBtn: document.querySelector(".search-btn"),
    list: document.querySelector(".gallery"),
    anchor: document.querySelector(".target-element")
}

const { form, searchBtn, list, input, anchor } = refs;

const observer = new IntersectionObserver(
    (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadMoreData();  
        }
    },
    {
        root: null,
        rootMargin: '300px',
        threshold: 1,
      }
);

const pixabayAPI = new PixabayAPI(40);

form.addEventListener("submit", onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    pixabayAPI.page = 1;
    // isFirstLoad = true;
    // isSubmit = true;
    list.innerHTML = "";

    const searchQuery = event.target.elements["user-search-query"].value.trim();
    pixabayAPI.q = searchQuery;
    if (!searchQuery) {
      list.innerHTML = "";
      return Notify.failure("Your query is empty. Please, try again.");
    }

    try {
        const response = await pixabayAPI.getPhotos();
        
        if (response.data.total) {
            Notify.success(` Hooray! We found ${Math.ceil(response.data.totalHits)} images`);
        } else {
            Notify.failure("Sorry! We didn't find your query. Please, try again.");
        }

        list.innerHTML = createMarkUp(response.data.hits);

        if (response.data.hits.length === 0) {
            list.innerHTML = "";

            observer.unobserve(anchor);
        }
        if (response.data.total > pixabayAPI.perPage) {
            observer.observe(anchor);
        }

  } catch (error) {console.log(error);
 }
}
async function loadMoreData() {
    try{
        
        if (pixabayAPI.page > 1) {
            const response = await pixabayAPI.getPhotos();
            list.insertAdjacentHTML("beforeend", createMarkUp(response.data.hits));


            if (Math.ceil(response.data.totalHits / 40) === pixabayAPI.page) {
                observer.unobserve(anchor);
               return Notify.success("We're sorry, but you've reached the end of search results.");
            }
        }
        pixabayAPI.page += 1;
    } catch (error) {console.log(error);
}
}
