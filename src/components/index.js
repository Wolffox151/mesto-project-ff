import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, toggleLikeButton } from './card.js'
import { openModal, closeModal, closePopupOnOverlayClick } from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, postUserProfile, getCards, postUserCard, deleteCardApi , addLikeCardApi, removeLikeCardApi} from './api.js'


const placesList = document.querySelector('.places__list');

// @todo: Открытие попапа картинки
const imagePopup = document.querySelector('.popup_type_image')
const openedImage = document.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')

const openImagePopup = (data) => {
  openedImage.src = data.link
  openedImage.alt= data.name
  popupCaption.textContent = data.name
  openModal(imagePopup)
}

// @todo: Список попапов
const popups = document.querySelectorAll('.popup');

// @todo: Плавная анимация
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
  popup.addEventListener('click', closePopupOnOverlayClick)
})

const popupTypeProfileEdit = document.querySelector('.popup_type_edit')
const editProfileButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImg = document.querySelector('.profile__image')
const profileFormLabelList = popupTypeProfileEdit.querySelectorAll('.popup__label')
// @todo: Открытие попапа для редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
  clearValidation(popupTypeProfileEdit, [profileFormLabelList, false])
  openModal(popupTypeProfileEdit);
});


// @todo: Функция изменения профиляn
// Находим форму в DOM
const profileForm = popupTypeProfileEdit.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')

nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent
const editProfileForm = () => {
  postUserProfile(nameInput.value, jobInput.value)
  .then(() => {
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
  })
  // Вставьте новые значения с помощью textContent
  closeModal(popupTypeProfileEdit)
}

const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')
const cardForm = popupTypeAddNewCard.querySelector('.popup__form')

// @todo: Обработа формы добавления карточки
const inputCardTitle = document.querySelector('.popup__input_type_card-name')
const inputCardImgLink = document.querySelector('.popup__input_type_url')
const addCardFormSubmit = () => {
  postUserCard(inputCardTitle.value, inputCardImgLink.value)
  .then(() => {
    getCards().then((response) => {
      const newCard = createCard(response[0], handleDeleteCard, deleteCardApi, openImagePopup, toggleLikeButton);
      placesList.prepend(newCard)
      cardForm.reset()
    })
  })
  closeModal(popupTypeAddNewCard)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', editProfileForm);

const addCardButton = document.querySelector('.profile__add-button')
const addCardPupupLabelList = popupTypeAddNewCard.querySelectorAll('.popup__label')
// @todo: Открытие попапа для добавления карточки
addCardButton.addEventListener('click', () => {
  inputCardTitle.value = ''
  inputCardImgLink.value = ''
  clearValidation(popupTypeAddNewCard, [addCardPupupLabelList, true])
  openModal(popupTypeAddNewCard);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardForm.addEventListener('submit', addCardFormSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

let currentUserId = ''

const fillDataUserProfile = (profileTitle, getUserInfo) => {
  getUserInfo().then((response) => {
    currentUserId = response['_id']
    profileTitle.textContent = response.name;
    profileDescription.textContent = response.about
    profileImg.style.backgroundImage = `url(${response.avatar})`
  })
  .catch((error) => {
    console.error('Ошибка при загрузке данных профиля', error)
  })
};


fillDataUserProfile(profileTitle, getUserInfo)

const loadCards = (placesList, getCards, createCard) => {
  getCards().then((response) => {
    response.forEach((cardData) => {
      const newCard = createCard(cardData, handleDeleteCard, deleteCardApi, openImagePopup, toggleLikeButton);
      if(currentUserId!==cardData.owner['_id']) {
        newCard.querySelector('.card__delete-button').remove()
      }
      placesList.append(newCard)
    })
  }).catch((error) => {
    console.error('Ошибка при загрузке карт:', error); // Обрабатываем возможные ошибки
  });
}

loadCards(placesList, getCards, createCard)

