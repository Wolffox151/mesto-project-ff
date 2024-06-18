import { templateCard } from './index.js'
// @todo: Функция создания карточки
// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const createCard = (data, onDelete) => {
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

// @todo: Функция удаления карточки
export const handleDeleteCard = (card) => {
  card.remove();
}

// @todo: Функция лайка карточки
export const likeCard = (evt) => {
  if (evt.target.classList.contains('card__like-button')) { 
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

// @todo: Функция изменения профиля
// Находим форму в DOM
export const profileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form')
// Находим поля формы в DOM
export const nameInput = profileForm.querySelector('.popup__input_type_name')
export const jobInput = profileForm.querySelector('.popup__input_type_description')
nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent 

export const editProfileForm = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value 
  // Выберите элементы, куда должны быть вставлены значения полей
  document.querySelector('.profile__title').textContent = nameInput.value
  document.querySelector('.profile__description').textContent = jobInput.value
  // Вставьте новые значения с помощью textContent
}


const cardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form')
// @todo: Функция добавления карточки
export const addCardFormSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value 
  // Выберите элементы, куда должны быть вставлены значения полей
  const InputCardTitle = document.querySelector('.popup__input_type_card-name').value
  const InputCardImgLink = document.querySelector('.popup__input_type_url').value
  const CardForm = [{name: InputCardTitle, link: InputCardImgLink }]
  // Вставьте новые значения с помощью textContent
  CardForm.forEach((data) => {
    const newCard = createCard(data, handleDeleteCard);
    placesList.prepend(newCard)
  })
}