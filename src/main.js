import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

hideLoader();

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchInput = document.querySelector('input').value;

  if (searchInput.trim() !== '') {
    showLoader();
    searchImages(searchInput)
      .then(data => {
        hideLoader();
        if (data.hits.length > 0) {
          displayImages(data.hits);
          initLightbox();
        } else {
          showNoResultsMessage();
        }
      })
      .catch(error => {
        hideLoader();
        console.error('Error fetching images:', error.message);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while fetching images. Please try again.',
        });
      });
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
  }
});

function searchImages(query) {
  const apiKey = '42011600-6d993b5d4f0ba2a9af1a5ffd0';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true`;

  return fetch(apiUrl).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  images.forEach(image => {
    const cardContainer = document.createElement('a');
    cardContainer.href = image.largeImageURL;
    cardContainer.className = 'image-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    const thumbnail = document.createElement('img');
    thumbnail.src = image.webformatURL;
    thumbnail.alt = image.tags;
    imageContainer.appendChild(thumbnail);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'image-info';

    const likes = document.createElement('span');
    likes.textContent = `Likes: ${image.likes}`;
    infoContainer.appendChild(likes);

    const views = document.createElement('span');
    views.textContent = `Views: ${image.views}`;
    infoContainer.appendChild(views);

    const comments = document.createElement('span');
    comments.textContent = `Comments: ${image.comments}`;
    infoContainer.appendChild(comments);

    const downloads = document.createElement('span');
    downloads.textContent = `Downloads: ${image.downloads}`;
    infoContainer.appendChild(downloads);

    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(infoContainer);

    gallery.appendChild(cardContainer);
  });
}

function initLightbox() {
  const options = {
    captionsData: 'alt',
    captionsDelay: 250,
  };
  const lightbox = new SimpleLightbox('.image-card', options);
  lightbox.refresh();
}

function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

function showNoResultsMessage() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
