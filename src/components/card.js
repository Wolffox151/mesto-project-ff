import { deleteCardApi } from "./api";

// @todo: Функция создания карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');
// @todo: DOM узлы
export const createCard = (data, onDelete, deleteCardApi, onImage, onLike) => {
  const newCard = templateCard.cloneNode(true);
  const imageCard = newCard.querySelector('.card__image')
  const titleCard = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button')
  const likeButton = newCard.querySelector('.card__like-button')
  const likesCounterNode = newCard.querySelector('.card__likes-counter')

  imageCard.src = data.link
  imageCard.alt = `Изображение ${data.name}`
  titleCard.textContent = data.name;
  likesCounterNode.textContent = `${data.likes.length}`
  
  deleteButton.addEventListener('click', () => {
    onDelete(newCard, data['_id'])
  });

  imageCard.addEventListener('click', () => {
    onImage(data)
  })

  likeButton.addEventListener('click', () => {
    onLike(likeButton)
  })
  
  return newCard;
}

// @todo: Функция удаления карточки
export const handleDeleteCard = (card, cardId) => {
  deleteCardApi(cardId)
  .then(() => card.remove())
}

// @todo: Лайк карточки

export const toggleLikeButton = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active')
}