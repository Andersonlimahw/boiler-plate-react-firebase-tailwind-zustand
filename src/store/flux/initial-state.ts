
export const initialState = {
  documentRefId: '',
  messages: [],
  contactList: [],
  user: {
    uid: 'DEFAULT',
  email: '',
  photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
    displayName: '',
  }, 
  selectedContact: {
    id: '',
    email: 'sample@sample.com',
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
    displayName: 'Hi, 😃',
  }, 
  theme: {
    type: 'blue',
    styles: {
      gradient: 'from-blue-900 to-blue-400',
      background: 'bg-blue-900', 
      text: 'text-zinc-100'
    }
  }
};
