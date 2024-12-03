import '../pages/index.css';
import { initialCards } from './cards.js'; // Импорт initialCards
import { enableValidation } from './validate.js';

const popupProfile = document.querySelector('.popup_type_profile');                     // Найти popup редактирования профиля
const popupOpenEdit = document.querySelector('.profile__edit-buton');                   // Найти кнопку открытия редактирования профиля
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');       // Найти форму popup изменения профиля
const profileName = document.querySelector('.profile-info__title');                     // Найти данные - name на странице
const profileJob = document.querySelector('.profile-info__intro');                      // Найти данные - job на странице
const inputName = document.querySelector('.popup__input_type_name');                    // Найти поле ввода - name в форме редактирования профиля
const inputJob = document.querySelector('.popup__input_type_job');                      // Найти поле ввода - job в форме редактирования профиля

const popupPlace = document.querySelector('.popup_type_place');                          // Найти popup редактирования карточек
const popupOpenAdd = document.querySelector('.profile__add-button');                     // Найти кнопку открытия редактирования карточек
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');              // Найти форму popup изменения карточек
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');             // Найти поле ввода - название региона в форме добавления карточки
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');               // Найти поле ввода - ссылки на фото в форме добавления карточки

const popupImage = document.querySelector('.popup_type_image');                           // Найти popup открытия просмотра увеличенного изображения
const elementImage = document.querySelector('.popup__img');                               // Найти изображение
const elementTitle = document.querySelector('.popup__name');                              // Найти описание региона

const popupCloseList = document.querySelectorAll('.popup__button-close');                  // Найти ВСЕ кнопки закрытия Popup

const popupClosest = document.querySelectorAll('.popup');                                  // Найти границы окна при нажатии на Esc и Overlay

const cardTemplate = document.querySelector('.template-card').content;                     // Найти шаблон карточки для добавления
const cardsContainer = document.querySelector('.elements');                                // Найти раздел, куда будут добавлятся карточки

const bindCardLikeEventListener = (buttonLike) => {
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });
};

const bindCardDeleteEventListener = (cardData) => {
  cardData.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);                                        // Клонировать содержимое тега template
  const cardElementTitle = cardElement.querySelector('.element__title');                   // Найти в шаблоне заголовок
  const cardElementPhoto = cardElement.querySelector('.element__img');                     // Найти в шаблоне фотографию
  const cardElementLike = cardElement.querySelector('.element__button');                   // Найти кнопку нравится-ненравится
  const cardElementDel = cardElement.querySelector('.element__basket');                    // Найти кнопку удаления карточе

  cardElementTitle.textContent = cardData.name;                                            // Присвоить значение name заголовку
  cardElementPhoto.src = cardData.link;                                                    // Присвоить значение link ссылке на картинку
  cardElementPhoto.alt = cardData.alt;                                                     // Присвоить описание картинке

  bindCardPreviewEventListener(cardElementPhoto);                                          // Открыть popup просмотра изображения карточки
  bindCardLikeEventListener(cardElementLike);                                              // Отметить в карточке нравится - ненравится
  bindCardDeleteEventListener(cardElementDel);                                             // Удалить карточку

  return cardElement;
};

const bindCardPreviewEventListener = (cardImageElement) => {
  cardImageElement.addEventListener('click', (evt) => {
    openPopup(popupImage);

    elementImage.src = cardImageElement.src;
    elementImage.alt = cardImageElement.alt;
    elementTitle.textContent = evt.target.closest('.element').textContent;
  });
};

initialCards.forEach((cardData) => {
  cardsContainer.append(createCard(cardData));
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseEscapeKey);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEscapeKey);
};

const popupCloseEscapeKey = (evt) => {
  if (evt.key === 'Escape'){
    popupClosest.forEach((popup) => {
      closePopup(popup);
    })
  }
}

popupOpenEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
});

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});

popupClosest.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});

popupOpenAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  popupFormTitle.value = '';
  popupFormLink.value = '';
});

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: popupFormTitle.value,
    link: popupFormLink.value,
  });

  evt.target.reset();
  closePopup(popupPlace);
});

const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
