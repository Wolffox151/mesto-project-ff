const cardContent = document.querySelector('.content')
cardContent.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    const EditProfilePopup = document.querySelector('.popup_type_edit');
    EditProfilePopup.classList.add('popup_is-opened');
    EditProfilePopup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        EditProfilePopup.classList.remove('popup_is-opened')
      }
    })
    if (EditProfilePopup.classList.contains('popup_is-opened')) {
      EditProfilePopup.addEventListener('click', clickOverley)
      function clickOverley(evt) {
        if (!evt.target.classList.contains('popup__content')) {
          EditProfilePopup.classList.remove('popup_is-opened')
        }
      }
      document.addEventListener('keyup', keyHandler)
      function keyHandler(evt) {
        if (evt.key === "Escape") {
          EditProfilePopup.classList.remove('popup_is-opened')
        }
      }
    }
  } else if (evt.target.classList.contains('profile__add-button')) {
    const AddCardPopup = document.querySelector('.popup_type_new-card')
    AddCardPopup.classList.add('popup_is-opened');
    AddCardPopup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        AddCardPopup.classList.remove('popup_is-opened')
      }
    })
    if (AddCardPopup.classList.contains('popup_is-opened')) {
      AddCardPopup.addEventListener('click', clickOverley)
      function clickOverley(evt) {
        if (!evt.target.classList.contains('popup__content')) {
          AddCardPopup.classList.remove('popup_is-opened')
        }
      }
      document.addEventListener('keyup', keyHandler)
      function keyHandler(evt) {
        if (evt.key === "Escape") {
          AddCardPopup.classList.remove('popup_is-opened')
        }
      }
    }
  } else if (evt.target.classList.contains('card__image')) {
    const OpenImagePopup = document.querySelector('.popup_type_image')
    OpenImagePopup.classList.add('popup_is-opened')
    OpenImagePopup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        OpenImagePopup.classList.remove('popup_is-opened')
      }
    })
    if (OpenImagePopup.classList.contains('popup_is-opened')) {
      OpenImagePopup.addEventListener('click', clickOverley)
      function clickOverley(evt) {
        if (!evt.target.classList.contains('popup__content')) {
          OpenImagePopup.classList.remove('popup_is-opened')
        }
      }
      document.addEventListener('keyup', keyHandler)
      function keyHandler(evt) {
        if (evt.key === "Escape") {
          OpenImagePopup.classList.remove('popup_is-opened')
        }
      }
    }
  }
})