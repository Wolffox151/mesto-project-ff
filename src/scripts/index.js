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
  console.log(evt.target)
})

function closePopupOnOverlayClick(evt) {
  if 
  (!evt.target.classList.contains('popup__content') && 
  (!evt.target.parentNode.classList.contains('popup__content') || evt.target.classList.contains('popup__close')) && 
  !evt.target.parentNode.classList.contains('popup__form'))  {
    togglePopup(evt.currentTarget);
  }
}

function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    togglePopup(document.querySelector('.popup_is-opened'))
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

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnOverlayClick);
  document.addEventListener('keyup', closePopupOnEscape);
})


// Находим форму в DOM
const formElement = document.querySelector('.popup_type_edit').querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value 
    // Выберите элементы, куда должны быть вставлены значения полей
    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);