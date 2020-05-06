// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
//
// export let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: "how are you?", likesCount: 12},
//                 {id: 2, message: "Its my first post", likesCount: 15},
//                 {id: 3, message: "How are you?", likesCount: 10},
//                 {id: 4, message: "Whats`s new?", likesCount: 11},
//                 {id: 5, message: "Whats up?", likesCount: 17},
//                 {id: 6, message: "Good morning", likesCount: 16}
//             ],
//             newPostText: "Something amazing"
//
//         },
//         dialogsPage: {
//             messages: [
//                 {id: 1, message: "Hi"},
//                 {id: 2, message: "Hello"},
//                 {id: 3, message: "How are you?"},
//                 {id: 4, message: "Whats`s new?"},
//                 {id: 5, message: "Whats up?"},
//                 {id: 6, message: "Good morning"}
//             ],
//             newMessageText: "Hello bro!",
//
//             dialogs: [
//                 {id: 1, name: "Kyrill"},
//                 {id: 2, name: "Sveta"},
//                 {id: 3, name: "Andrey"},
//                 {id: 4, name: "Kolya"},
//                 {id: 5, name: "Igor"},
//                 {id: 6, name: "Alex"},
//                 {id: 7, name: "Valera"}
//             ]
//         },
//     },
//     _callSubscriber() {
//         alert("state has been changed");
//     },
//     getState() {
//         return this._state
//     },
//     addMessage() {
//         let newMessage = {
//             id: 8,
//             message: this._state.dialogsPage.newMessageText
//         };
//         this._state.dialogsPage.messages.push(newMessage);
//         this._state.dialogsPage.newMessageText = " ";
//         this._callSubscriber(this._state);
//     },
//     updateNewMessageText(newMessage) {
//         this._state.dialogsPage.newMessageText = newMessage;
//         this._callSubscriber(this._state);
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber(this._state);
//     }
// };
//
//
//
// export default store