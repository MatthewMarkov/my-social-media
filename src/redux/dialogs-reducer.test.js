import dialogsReducer, { sentMessage } from './dialogs-reducer';

const state = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Hello' },
    { id: 3, message: 'How are you?' },
    { id: 4, message: 'Whats`s new?' },
    { id: 5, message: 'Whats up?' },
    { id: 6, message: 'Good morning' },
  ],
  dialogs: [
    { id: 1, name: 'Kyrill' },
    { id: 2, name: 'Sveta' },
    { id: 3, name: 'Andrey' },
    { id: 4, name: 'Kolya' },
    { id: 5, name: 'Igor' },
    { id: 6, name: 'Alex' },
    { id: 7, name: 'Valera' },
  ],
};

test('add message', () => {
  const action = sentMessage('hello, friend');
  const newState = dialogsReducer (state, action);
  expect(newState.messages.length).toBe(7);
});
