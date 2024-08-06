import { deleteCardApi, addLikeCardApi, removeLikeCardApi } from "./api";

// @todo: Функция создания карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');
// @todo: DOM узлы
export const createCard = (data, onDelete, deleteCardApi, onImage, onLike, addLikeCardApi, removeLikeCardApi) => {
  const newCard = templateCard.cloneNode(true);
  const imageCard = newCard.querySelector('.card__image')
  const titleCard = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button')
  const likeButton = newCard.querySelector('.card__like-button')
  const likesCounterNode = newCard.querySelector('.card__likes-counter')
  console.log(data)

  imageCard.src = data.link
  imageCard.alt = `Изображение ${data.name}`
  titleCard.textContent = data.name;
  likesCounterNode.textContent = data.likes.length  
  
  deleteButton.addEventListener('click', () => {
    onDelete(newCard, data['_id'])
  });

  imageCard.addEventListener('click', () => {
    onImage(data)
  })

  likeButton.addEventListener('click', () => {
    onLike(likeButton, data['_id'], addLikeCardApi, removeLikeCardApi, likesCounterNode)
  })
  
  return newCard;
}

// @todo: Функция удаления карточки
export const handleDeleteCard = (card, cardId) => {
  deleteCardApi(cardId)
  .then(() => card.remove())
}

// @todo: Лайк карточки

export const toggleLikeButton = (likeButton, cardId, likesCounterNode) => {
  if(!likeButton.classList.contains('card__like-button_is-active')) {
    addLikeCardApi(cardId)
    .then(() => {
      likeButton.classList.add('card__like-button_is-active')
      likesCounterNode.textContent = `${Number(likesCounterNode.textContent)+1}`
    })
  } else {
    removeLikeCardApi(cardId)
    .then(() => likeButton.classList.remove('card__like-button_is-active'))
    likesCounterNode.textContent = `${Number(likesCounterNode.textContent)-1}`
  }
}