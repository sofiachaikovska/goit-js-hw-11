import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

hideLoader();

const options = {
  captionsData: 'alt',
  captionsDelay: 250,
};
const lightbox = new SimpleLightbox('.image-card', options);

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchInput = document.querySelector('input').value.trim();

  if (searchInput === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }
  showLoader();
  searchImages(searchInput)
    .then(data => {
      hideLoader();
      if (data.hits.length > 0) {
        displayImages(data.hits);
        lightbox.refresh();
      } else {
        showNoResultsMessage();
        clearImages();
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

  const ul = document.createElement('ul');
  ul.className = 'image-list';

  const imageMarkup = images
    .map(
      image => `
    <li class="image-item">
      <a href="${image.largeImageURL}" class="image-card">
        <div class="image-container">
          <img src="${image.webformatURL}" alt="${image.tags}">
        </div>
        <div class="image-info">
          <span>Likes: ${image.likes}</span>
          <span>Views: ${image.views}</span>
          <span>Comments: ${image.comments}</span>
          <span>Downloads: ${image.downloads}</span>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  ul.innerHTML = imageMarkup;
  gallery.appendChild(ul);
}

function clearImages() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
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
