import { deleteCardApi, addLikeCardApi, removeLikeCardApi } from "./api";

// @todo: Функция создания карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');
// @todo: DOM узлы
export const createCard = (data, userId, onDelete, onImage, onLike) => {
  const newCard = templateCard.cloneNode(true);
  const imageCard = newCard.querySelector('.card__image')
  const titleCard = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button')
  const likeButton = newCard.querySelector('.card__like-button')
  const likesCounterNode = newCard.querySelector('.card__likes-counter')

  imageCard.src = data.link
  imageCard.alt = `Изображение ${data.name}`
  titleCard.textContent = data.name;
  likesCounterNode.textContent = data.likes.length

  if (data.owner['_id']==userId) {
      deleteButton.addEventListener('click', () => {
    onDelete(newCard, data['_id'])
  });
  } else {
    deleteButton.remove()
  }

  data.likes.some((likedUser) => {
    if (likedUser['_id']==userId) {
      likeButton.classList.add('card__like-button_is-active')
    }
  })

  imageCard.addEventListener('click', () => {
    onImage(data)
  })

  likeButton.addEventListener('click', () => {
    onLike(likeButton, data['_id'], likesCounterNode)
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
    .then((res) => {
      likeButton.classList.add('card__like-button_is-active')
      likesCounterNode.textContent = `${Number(res.likes.length)}`
    })
  } else {
    removeLikeCardApi(cardId)
    .then((res) => {
      likeButton.classList.remove('card__like-button_is-active')
      likesCounterNode.textContent = `${Number(res.likes.length)}`
    })
  }
}