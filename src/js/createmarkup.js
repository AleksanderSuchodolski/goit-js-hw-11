export function createMarkUp(arr) {
    return arr.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
    }) => `<div class="photo-card">
    <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
     <div class="info">
       <p class="info-item">
          <b><i>Likes : ${likes}</i></b>
       </p>
        <p class="info-item">
          <b> <i>Views : ${views}</i></b>
        </p>
       <p class="info-item">
         <b><i>Comments : ${comments}</i></b>
       </p>
       <p class="info-item">
         <b><i>Downloads : ${downloads}</i></b>
       </p>
      </div>
    </div>`
   )
    .join("");

}