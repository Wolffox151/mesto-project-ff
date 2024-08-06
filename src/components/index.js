import '../pages/index.css';
import { createCard, handleDeleteCard, toggleLikeButton } from './card.js'
import { openModal, closeModal, closePopupOnOverlayClick } from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import { postUserProfile, getCards, postUserCard, getInitialInfo} from './api.js'


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
      const newCard = createCard(response[0], response[0]['owner']['_id'], handleDeleteCard, openImagePopup, toggleLikeButton);
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


const fillUserProfile = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about
  profileImg.style.backgroundImage = `url(${userData.avatar})`
};

const loadCards = (cardsData, userId) => {
  cardsData.forEach((cardData) => {
    placesList.append(createCard(cardData, userId, handleDeleteCard, openImagePopup, toggleLikeButton));
  })
}

getInitialInfo()
.then ((result) => {
  const [userData, cardsData] = result
  const userId = userData['_id']
  fillUserProfile(userData)
  loadCards(cardsData, userId)
})
.catch((error) => console.error(error))
