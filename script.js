// ПЕРЕМЕННЫЕ

// Токен: 72c21e45-064e-408d-8880-9cc3f4690a39
// Идентификатор группы: cohort8
// _id: "a4954c0f7488eea50ba868ce"
(function() {


    // const placeCard = document.querySelector('.place-card');
    // const popupClose = document.querySelector('.popup__close');
    // const popupEditClose = document.querySelector('.popup-edit__close-edit');
    // const form = document.querySelector('.popup__form');
    // const formEdit = document.querySelector('.popup__form-edit');
    // const popupImage = document.querySelector('.popup-photo__image');
    // const popupButton = document.querySelector('.popup__button');
    // const popupEditButton = document.querySelector('.popup-edit__button-edit');
    // const placeName = document.querySelector('.popup__input_type_name');
    // const placeUrl = document.querySelector('.popup__input_type_link-url');


    const placesList = document.querySelector('.places-list');
    const button = document.querySelector('.user-info__button');
    const buttonEdit = document.querySelector('.user-info__edit');
    const popup = document.querySelector('.popup');
    const popupEdit = document.querySelector('.popup-edit');
    const userName = document.querySelector('.user-info__name');
    const userJob = document.querySelector('.user-info__job');
    const popupPhoto = document.querySelector('.popup-photo');
    const popupImageClose = document.querySelector('.popup-photo__close-image');


    // const objConst = {
    //     placesList: document.querySelector('.places-list'),
    //     button: document.querySelector('.user-info__button'),
    //     buttonEdit: document.querySelector('.user-info__edit'),
    //     popup: document.querySelector('.popup'),
    //     popupEdit: document.querySelector('.popup-edit'),
    //     userName: document.querySelector('.user-info__name'),
    //     userJob: document.querySelector('.user-info__job'),
    //     popupPhoto: document.querySelector('.popup-photo'),
    //     popupImageClose: document.querySelector('.popup-photo__close-image'),
    //     popupEditClose: document.querySelector('.popup-edit__close-edit'),
    //     formEdit: document.querySelector('.popup__form-edit')
    // }

    const ERROR_MESSAGES = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        tooLong: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка',
        noError: ''
    }



    // ЭКЗЕМПЛЯРЫ КЛАССОВ

    const card = new Card();
    const api = new Api({
        baseUrl: 'https://praktikum.tk/cohort8',
        headers: {
            authorization: '72c21e45-064e-408d-8880-9cc3f4690a39',
            'Content-Type': 'application/json'
        }
    });

    const userInfo = new UserInfo(document.querySelector('.user-info'), api);
    const cardList = new Cardlist(placesList, card, api, userInfo);
    const popupEditProfile = new PopupWithForm(popupEdit, userName, userJob, '.popup__input_type_name-user', '.popup__input_type_job', userInfo, api);


    Promise.all([
            api.getInitialCards(),
            api.getUser(),
        ])
        .then(([initialCards, user]) => {
            cardList.render(initialCards)
            userInfo.userAvatar(user.avatar);
            userInfo.setUserInfo(user._id, user.name, user.about);
            userInfo.updateUserInfo();
        })
        .catch(err => {
            console.log(err);
        })


    const newPlace = new NewPlace(placesList);
    const popupNewPlace = new PopupWithFormPlace(popup, cardList, '.popup__input_type_name', '.popup__input_type_link-url');
    const formValidator = new FormValidator(popupEdit, ERROR_MESSAGES);
    const formPlaceValidator = new FormValidator(popup, ERROR_MESSAGES);
    const popupFoto = new PopupFoto(popupPhoto);



    //СЛУШАТЕЛИ

    buttonEdit.addEventListener('click', popupEditProfile.open.bind(popupEditProfile));
    button.addEventListener('click', popupNewPlace.open.bind(popupNewPlace));
    placesList.addEventListener('click', card.like);
    placesList.addEventListener('click', card.remove);
    placesList.addEventListener('click', popupFoto.popupPhotoOpen.bind(popupFoto));
    popupImageClose.addEventListener('click', popupFoto.popupPhotoClose.bind(popupFoto));
    document.addEventListener('keydown', popupNewPlace.exitClickKey.bind(popupNewPlace));
    document.addEventListener('click', popupNewPlace.exitClickKey.bind(popupNewPlace));
    document.addEventListener('keydown', popupEditProfile.exitClickKey.bind(popupEditProfile));
    document.addEventListener('click', popupEditProfile.exitClickKey.bind(popupEditProfile));
    document.addEventListener('keydown', popupFoto.popupPhotoClose.bind(popupFoto));
    document.addEventListener('click', popupFoto.popupPhotoClose.bind(popupFoto));


})()
//----------------------------------------------------------------------

/**
 * Добрый день!
 *
 * отправляю на проверку только обязательные задания, так как по времени не успеваю все правильно выполнить в срок.
 * Буду доделывать дополнительные задания в течении каникул.
 *
 * заранее спасибо за понимание!
 */







/********************************************************************************************************************************************

REVIEW. Резюме.

По 9-му заданию.

В чём достигнут успех.

1.Взаимодействие с сервером при сабмите формы профиля происходит почти правильно.
2. Информация о профиле берётся из объекта ответа сервера и переносится на страницу, форма закрывается
только после успешного ответа сервера.
3. Методы класса Api имеют правильную структуру.
4. Обработка ответа сервера происходит вне методов класса Api.


Что надо исправить по 9-му заданию.

1. В классе UserInfo создать метод обработки адреса аватара, который возвращает сервер при загрузке страницы (подробнее об этом
 методе см. в комментарии в модуле класса UserInfo).
2.Вызывать этот метод при загрузке страницы в нужном месте. По поводу вызова этого метода -  комментарий в script.js
в Promise.all.

3. Не передавать на сервер при сабмите формы профиля аватар, передавать
только информацию из полей формы (подробности в комментариях в  Popup.js).


Что надо исправить по предыдущим заданиям.

1.Обернуть весь код script.js в IIFE функцию (задание 8).
2. Требования о месте определени констант проекта читайте в комментприях в модуле Popup.js и PopupWithFormPlace.js,
но это нужно исправить во всех классах.
 (задание 8).
3. Придавать форме профиля валидный вид при её открытии. Так как при открытии в эту форму всегда вносится валидная информация,
на форме при открытии кнопка "Сохранить" должна быть доступна и чёрного цвета (подробности в комментариях в  Popup.js в методе open()).
(задание 7).


*/

/**
 * Игорь Лисянский/ 25.02
 *
 * Что надо исправить по 9-му заданию.

1. В классе UserInfo создать метод обработки адреса аватара, который возвращает сервер при загрузке страницы (подробнее об этом методе см. в комментарии в модуле класса UserInfo).
- OK

2.Вызывать этот метод при загрузке страницы в нужном месте. По поводу вызова этого метода -  комментарий в script.js
в Promise.all.
- OK

3. Не передавать на сервер при сабмите формы профиля аватар, передавать
только информацию из полей формы (подробности в комментариях в  Popup.js).
- OK

Что надо исправить по предыдущим заданиям.

1.Обернуть весь код script.js в IIFE функцию (задание 8).

2. Требования о месте определени констант проекта читайте в комментприях в модуле Popup.js и PopupWithFormPlace.js,
но это нужно исправить во всех классах.
(задание 8).

3. Придавать форме профиля валидный вид при её открытии. Так как при открытии в эту форму всегда вносится валидная информация, на форме при открытии кнопка
"Сохранить" должна быть доступна и чёрного цвета (подробности в комментариях в  Popup.js в методе open()).
(задание 7).


*****************************************************************************************************************************************

REVIEW2. Резюме2.

Что надо доделать.

Исправлены все ошибки, кроме
2. Требования о месте определения констант проекта
(задание 8).
Читайте  об этом в комментприи в начале этого модуля.


REVIEW3. Резюме3.

Ошибки исправлены. Обязательные требования выполнены. Код организован логично.
Отлично, что Вы передаёте в конструктор класса PopupWithFormPlace как параметры селекторы классов DOM-элементов, это делает класс независимым
от конкретных значений этих селекторов.

Задание принято!
*/