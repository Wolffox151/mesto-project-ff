import '../pages/index.css';
import { createCard, popupConfirm } from './card.js'
import { openModal, closeModal, closePopupOnOverlayClick } from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import { postUserProfile, changeAvatarApi, postUserCard, getInitialInfo, deleteCardApi, addLikeCardApi, removeLikeCardApi } from './api.js'


const placesList = document.querySelector('.places__list');
const popupButtonSelector = '.popup__button';
const popupButtonDisabledClass = 'popup__button_disabled'
const popupInputSelector = '.popup__input';
const popupInputErrorClass = 'popup__input_type_error'
const popupLabelSelector = '.popup__error'
const popupLabelErrorVisibleClass = 'popup__error_visible'


const popupConfirmButton = popupConfirm.querySelector(popupButtonSelector)


let cardToDelete;
const confirmDelete = () => {
  deleteCardApi(popupConfirm.dataset.cardId)
  .then(() => {
    delete popupConfirm.dataset.cardId
    cardToDelete.remove()
    closeModal(popupConfirm)
    cardToDelete = null;
  })
  .catch(() => {
    console.error(error)
  })
}

popupConfirmButton.addEventListener('click', confirmDelete)

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
  clearValidation(popupTypeProfileEdit, 
    {
      labelList: profileFormLabelList, 
      buttonState: false,
      ['popupButtonSelector']: popupButtonSelector,
      ['popupButtonDisabledClass']: popupButtonDisabledClass,
      ['popupInputSelector'] : popupInputSelector,
      ['popupInputErrorClass'] : popupInputErrorClass,

      ['popupLabelErrorVisibleClass'] : popupLabelErrorVisibleClass
    })
  openModal(popupTypeProfileEdit);
});

const popupTypeProfileAvatarEdit = document.querySelector('.popup_type_edit-avatar')
const editProfileAvatarButton = document.querySelector('.profile__image-container')
const avatarForm = popupTypeProfileAvatarEdit.querySelector('.popup__form')
const avatarLabelList = avatarForm.querySelectorAll('.popup__label')
const avatarInputLink = avatarForm.querySelector('.popup__input_type_url')

editProfileAvatarButton.addEventListener('click', () => {
  avatarInputLink.value = ''
  clearValidation(popupTypeProfileAvatarEdit, 
    {
      labelList: avatarLabelList, 

      ['popupButtonSelector']: popupButtonSelector,
      ['popupButtonDisabledClass']: popupButtonDisabledClass,
      ['popupInputSelector'] : popupInputSelector,
      ['popupInputErrorClass'] : popupInputErrorClass,

      ['popupLabelErrorVisibleClass'] : popupLabelErrorVisibleClass
    })
  openModal(popupTypeProfileAvatarEdit)
})

const awaitResponseApi = (buttonElement, state) => {
  if (state) {
    buttonElement.textContent = 'Сохранение...'
  } else [
    buttonElement.textContent = 'Сохранить'
  ]
}

avatarForm.addEventListener('submit',() => {
  awaitResponseApi(avatarForm.querySelector(popupButtonSelector), true)
  changeAvatarApi(avatarInputLink.value)
  .then((res) => {
    profileImg.style.backgroundImage = `url(${res.avatar})`
    closeModal(popupTypeProfileAvatarEdit)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponseApi(avatarForm.querySelector(popupButtonSelector), false)
  })
})



// @todo: Функция изменения профиляn
// Находим форму в DOM
const profileForm = popupTypeProfileEdit.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')

nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent
const editProfileForm = () => {
  awaitResponseApi(profileForm.querySelector(popupButtonSelector), true)
  postUserProfile(nameInput.value, jobInput.value)
  .then(() => {
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(popupTypeProfileEdit)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponseApi(profileForm.querySelector(popupButtonSelector), false)
  })
  // Вставьте новые значения с помощью textContent
}

const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')
const cardForm = popupTypeAddNewCard.querySelector('.popup__form')


// @todo: Функция удаления карточки
const handleDeleteCard = (card, cardId) => {
  openModal(popupConfirm)
  popupConfirm.dataset.cardId = cardId
  cardToDelete = card;
}

// @todo: Лайк карточки

const toggleLikeButton = (likeButton, cardId, likesCounterNode) => {
  if(!likeButton.classList.contains('card__like-button_is-active')) {
    addLikeCardApi(cardId)
    .then((res) => {
      likeButton.classList.add('card__like-button_is-active')
      likesCounterNode.textContent = `${Number(res.likes.length)}`
    })
    .catch((res) => console.error(res))
  } else {
    removeLikeCardApi(cardId)
    .then((res) => {
      likeButton.classList.remove('card__like-button_is-active')
      likesCounterNode.textContent = `${Number(res.likes.length)}`
    })
    .catch((res) => console.error(res))
  }
}

// @todo: Обработа формы добавления карточки
const inputCardTitle = cardForm.querySelector('.popup__input_type_card-name')
const inputCardImgLink = cardForm.querySelector('.popup__input_type_url')
const addCardFormSubmit = async () => {
  awaitResponseApi(cardForm.querySelector(popupButtonSelector), true)
  postUserCard(inputCardTitle.value, inputCardImgLink.value)
  .then((response) => {
    const newCard = createCard(response, response['owner']['_id'], handleDeleteCard, openImagePopup, toggleLikeButton);
    placesList.prepend(newCard)
    cardForm.reset()
    closeModal(popupTypeAddNewCard)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponseApi(cardForm.querySelector(popupButtonSelector), false)
  })
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
  clearValidation(popupTypeAddNewCard, 
  {
    labelList: addCardPupupLabelList, 
    ['popupButtonSelector']: popupButtonSelector,
    ['popupButtonDisabledClass']: popupButtonDisabledClass,
    ['popupInputSelector'] : popupInputSelector,
    ['popupInputErrorClass'] : popupInputErrorClass,
    ['popupLabelErrorVisibleClass'] : popupLabelErrorVisibleClass
  })
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