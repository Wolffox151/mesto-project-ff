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