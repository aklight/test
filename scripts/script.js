const confing = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const openPopupButtonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup-edit');
const openPopupButtonAdd = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup-add');
const closePopupButtonEdit = document.querySelector('.popup__close-edit');
const closePopupButtonAdd = document.querySelector('.popup__close-add');
const elementTemplate = document.querySelector('.elements-template').content;
const elementsList = document.querySelector('.elements__list');
const formElementSave = document.querySelector('.popup__save');
const nameInput = formElementSave.querySelector('.popup__input_string_name');
const jobInput = formElementSave.querySelector('.popup__input_string_subheading');
const formElementAdd = document.querySelector('.popup__create');
const titleInput = formElementAdd.querySelector('.popup__input_string_title');
const linkInput = formElementAdd.querySelector('.popup__input_string_link');
const imagePopup = document.querySelector('.popup-image');
const photoPopup = document.querySelector('.popup__photo');
const subtitlePopup = document.querySelector('.popup__subtitle');
const closePopupButtonImage = document.querySelector('.popup__close-image');
const popup = document.querySelector('popup');

function closeEsc(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_open');
    closePopup(activePopup);
  }
}

function closeClick(evt) {
  if (evt.target === evt.currentTarget) {
  const activePopup = document.querySelector('.popup_open');
  closePopup(activePopup);
}
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keyup', closeEsc);
  popupElement.addEventListener('mousedown', closeClick);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keyup', closeEsc);
  popupElement.removeEventListener('mousedown', closeClick);
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

function renderItems() {
  const arrayCards = initialCards.map(renderItem);
  elementsList.append(...arrayCards);
}

function renderItem(element) {
  const HtmlElement = elementTemplate.cloneNode(true);
  const createtext = HtmlElement.querySelector('.element__text');
  const cteateimage = HtmlElement.querySelector('.element__image');
  createtext.textContent = element.name;
  cteateimage.src = element.link;
  cteateimage.alt = element.name;

  const likeButton = HtmlElement.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt) {
   evt.target.classList.toggle('element__like_active')});

  const deleteButton = HtmlElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', function (evt) {
   evt.target.closest('.element').remove()});

  const clickImage = HtmlElement.querySelector('.element__image');
  clickImage.addEventListener('click', function() {
    photoPopup.src = cteateimage.src;
    photoPopup.alt = cteateimage.alt;
    subtitlePopup.textContent = createtext.textContent;
    openPopup(imagePopup);});

  return HtmlElement;
}

function cardSubmitHandler(evt) {
  evt.preventDefault();
  const cardAdd = renderItem({name: titleInput.value, link:linkInput.value});
  elementsList.prepend(cardAdd);
  titleInput.value = '';
  linkInput.value = '';
  const buttonSubmit = evt.target.querySelector('.popup__button');
  buttonSubmit.setAttribute('disabled', 'true');
  buttonSubmit.classList.add('popup__button_disabled');
  closePopup(addPopup);
}

openPopupButtonEdit.addEventListener('click', function () {
  nameInput.value = profileName.innerText;
  jobInput.value = profileDescription.innerText;
  openPopup(editPopup);
  validateInput(editPopup, nameInput, confing);
  validateInput(editPopup, jobInput, confing);
});

openPopupButtonAdd.addEventListener('click', function () {
  openPopup(addPopup);
});

closePopupButtonEdit.addEventListener('click', function () {
  closePopup(editPopup);});

closePopupButtonAdd.addEventListener('click', function () {
  closePopup(addPopup);});

formElementSave.addEventListener('submit', formSubmitHandler);

renderItems();

formElementAdd.addEventListener('submit', cardSubmitHandler);

closePopupButtonImage.addEventListener('click', function () {
  closePopup(imagePopup);});
