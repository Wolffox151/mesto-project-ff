import '../pages/index.css';
import { initialCards } from './cards.js';
// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const createCard = (data, onDelete) => {
  const newCard = templateCard.cloneNode(true);
  const imageCard = newCard.querySelector('.card__image')
  const titleCard = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button')

  imageCard.src = data.link
  imageCard.alt = `Изображение ${data.name}`
  titleCard.textContent = data.name;
  

  deleteButton.addEventListener('click', () => {
    onDelete(newCard)
  });

  return newCard;
}

const handleDeleteCard = (card) => {
  card.remove();
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const newCard = createCard(data, handleDeleteCard);
  placesList.append(newCard)
})

// @todo Открытие закрытие попапа
const popups = document.querySelectorAll('.popup');

function togglePopup(popups) {
  popups.classList.toggle('popup_is-opened');
}

document.addEventListener('click', evt => {
  console.log(evt.target.parentNode.classList)
})

function closePopupOnOverlayClick(evt) {
  if 
  (!evt.target.classList.contains('popup__content') && 
  (!evt.target.parentNode.classList.contains('popup__content') || evt.target.classList.contains('popup__close')) && 
  !evt.target.parentNode.classList.contains('popup__form'))  {
    togglePopup(evt.currentTarget);
  }
}


document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    togglePopup(document.querySelector('.popup_type_edit'));
  } else if (evt.target.classList.contains('profile__add-button')) {
    togglePopup(document.querySelector('.popup_type_new-card'));
  } else if (evt.target.classList.contains('card__image')) {
    togglePopup(document.querySelector('.popup_type_image')); 
  }
});

function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    togglePopup(evt.currentTarget)
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnOverlayClick);
  document.addEventListener('keyup', closePopupOnEscape);
})
