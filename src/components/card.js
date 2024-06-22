// @todo: Функция создания карточки
import { closeModal, popupTypeAddNewCard } from './modal.js'
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');
// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const createCard = (data, onDelete, onImage) => {
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

  imageCard.addEventListener('click', () => {
    onImage(data)
  })
  
  return newCard;
}

const onLike = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

// // @todo: Открытие попапа при нажатии на картинку
// export const openImagePopup = (evt) => {
//   if (evt.target.classList.contains('card__image')) {
//     const clickedCard = evt.target.closest('.places__item')
//     const clickedCardImageLink = evt.target.src
//     const clickedCardImageAlt = evt.target.alt
//     const clickedCardImageHeading = clickedCard.querySelector('.card__title').textContent
//     openedImage.src = clickedCardImageLink
//     openedImage.alt= clickedCardImageAlt
//     popupCaption.textContent = clickedCardImageHeading
//     openModal(imagePopup)
//   }
// }

// @todo: Функция удаления карточки
export const handleDeleteCard = (card) => {
  card.remove();
}

export const cardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form')
// @todo: Функция добавления карточки
export const addCardFormSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value 
  // Выберите элементы, куда должны быть вставлены значения полей
  const inputCardTitle = document.querySelector('.popup__input_type_card-name').value
  const inputCardImgLink = document.querySelector('.popup__input_type_url').value
  const inputCardForm = {name: inputCardTitle, link: inputCardImgLink }
  // Вставьте новые значения с помощью textContent{
  const newCard = createCard(inputCardForm, handleDeleteCard, openImagePopup);
  placesList.prepend(newCard)
  cardForm.reset()
  closeModal(popupTypeAddNewCard)
}