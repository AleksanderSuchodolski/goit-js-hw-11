import axios from 'axios';

export class PixabayAPI {
 #BASE_URL = "https://pixabay.com/api/";
#API_KEY = "39935155-db3e39e88100f8058e720cfa7";

constructor(perPage) {
    this.q = null;
    this.page = 1;
    this.perPage = perPage;
    
}
getPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
        params: {
            key: this.#API_KEY,
            q: this.q,
            page: this.page,
            per_page: this.per_page,
            image_type: `photo`,
            orientation:`horizontal`,
            safesearch: true,
        },
    });
    // .then((res) => res.data)
}
}