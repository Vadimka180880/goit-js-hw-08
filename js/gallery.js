const images = [
{
preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
description: 'Hokkaido Flower',
},
{
preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
description: 'Container Haulage Freight',
},
{
preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
description: 'Aerial Beach View',
},
{
preview: 'https://picsum.photos/id/557/340/240', 
original: 'https://picsum.photos/id/557/800/600',
description: 'River in the mount "Бистриця Надвірнянська" ',
},
{
preview: 'https://picsum.photos/id/777/340/240', 
original: 'https://picsum.photos/id/777/800/600',
description: 'Sunrise',
},
{
preview: 'https://picsum.photos/id/238/340/240', 
original: 'https://picsum.photos/id/238/800/600',
description: 'New York City',
},
{
preview: 'https://picsum.photos/id/1003/340/240', 
original: 'https://picsum.photos/id/1003/800/600',
description: 'Baby dear',
},
{
preview: 'https://picsum.photos/id/257/340/240', 
original: 'https://picsum.photos/id/257/800/600',
description: 'River in the city',
},
{
preview: 'https://picsum.photos/id/1002/340/240', 
original: 'https://picsum.photos/id/1002/800/600',
description: 'Beautiful Mountains',
},
];

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = images
.map(
({ preview, original, description }) => `
<li class="gallery-item">
<a class="gallery-link" href="${original}">
<img
class="gallery-image"
src="${preview}"
alt="${description}"
/>
</a>
</li>
`
)
.join(''); 

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
event.preventDefault(); 

const isImage = event.target.classList.contains('gallery-image');
if (!isImage) return; 

let currentIndex = images.findIndex(
    (image) => image.original === event.target.closest('.gallery-link').href
);

const instance = basicLightbox.create(
    `
    <div style="position: relative; text-align: center; padding: 0;">
        <img id="modal-image" src="${images[currentIndex].original}" style="max-width: 800px; max-height: 600px; width: auto; height: auto; display: block; margin: 0 auto;" alt="${images[currentIndex].description}">
        <p id="modal-description" style="margin-top: 15px; font-size: 20px; line-height: 1.5; font-family: Arial, sans-serif; color: #fff;">${images[currentIndex].description}</p>
        <button id="prev-btn" style="position: absolute; top: 50%; left: 20px; transform: translateY(-50%); background: none; border: none; color: white; font-size: 30px; cursor: pointer;">❮</button>
        <button id="next-btn" style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: none; border: none; color: white; font-size: 30px; cursor: pointer;">❯</button>
    </div>
    `,
    {
    // Налаштування модального вікна для затемнення фону
    onShow: (instance) => {
        instance.element().style.background = 'rgba(0, 0, 0, 0.8)';
    },
    }
);

instance.show(); 

// Додаємо функціонал для стрілок у модальному вікні
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');

// Обробник для кнопки "Попереднє"
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].original;
    modalImage.alt = images[currentIndex].description;
    modalDescription.textContent = images[currentIndex].description;
});

// Обробник для кнопки "Наступне"
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].original;
    modalImage.alt = images[currentIndex].description;
    modalDescription.textContent = images[currentIndex].description;
});
}
