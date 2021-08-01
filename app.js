const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.js-gallery');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

let activeIndex = 0;

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
      `;
  })
  .join('');
};

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxOpen(event);
}

// модальное окно открытие
const lightbox = document.querySelector('.lightbox');

function lightboxOpen(event) {
  galleryItems.forEach((element, index) => {
      if(element.preview === event.target.src) {
        activeIndex = index;
      }
  })

  lightbox.classList.add('is-open');
  lightboxImage.setAttribute('src', event.target.dataset.source);
  lightboxImage.setAttribute('alt', event.target.alt);

  window.addEventListener('keyup', lightboxCloseESC);
  window.addEventListener('click', lightboxCloseOverlay);
}


// модальное окно закрытие

const closeButton = document.querySelector(".lightbox__button");
closeButton.addEventListener('click', lightboxClose);

function lightboxClose(event) {
  lightbox.classList.remove('is-open');
  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');

  window.removeEventListener('keyup', lightboxCloseESC);
  window.removeEventListener('click', lightboxCloseOverlay);
}

// закрытие по ESC

function lightboxCloseESC(event) {
  if(event.key !== 'Escape') {
    return;
  }
  lightboxClose(event);
}

// закрытие по клику на оверлей

function lightboxCloseOverlay(event) {
  event.stopPropagation();
  if(event.target !== lightboxOverlay){
    return;
  }
  lightboxClose(event);
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

window.addEventListener('keyup', onArrowRightLeftKeys);

function onArrowRightLeftKeys(event) {
  switch (event.key) {
      case activeIndex < galleryItems.length - 1 && 'ArrowRight':
        activeIndex +=1;
        lightboxImage.src = galleryItems[activeIndex].original;
        break;

      case activeIndex === galleryItems.length - 1 && 'ArrowRight':
        activeIndex = 0;
        lightboxImage.src = galleryItems[activeIndex].original;
        break;

      case activeIndex > 0 && 'ArrowLeft':
        activeIndex -=1;
        lightboxImage.src = galleryItems[activeIndex].original;
        break;

      case activeIndex === 0 && 'ArrowLeft':
        activeIndex = galleryItems.length - 1;
        lightboxImage.src = galleryItems[activeIndex].original;
        break;

    default:
      return;
  }
}
