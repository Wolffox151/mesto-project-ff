// @todo: Функция создания карточки
const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');
// @todo: DOM узлы
export const createCard = (data, onDelete, onImage, onLike) => {
  const newCard = templateCard.cloneNode(true);
  const imageCard = newCard.querySelector('.card__image')
  const titleCard = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button')
  const likeButton = newCard.querySelector('.card__like-button')

  imageCard.src = data.link
  imageCard.alt = `Изображение ${data.name}`
  titleCard.textContent = data.name;
  
  deleteButton.addEventListener('click', () => {
    onDelete(newCard)
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
export const handleDeleteCard = (card) => {
  card.remove();
}

// @todo: Лайк карточки

export const toggleLikeButton = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active')
}