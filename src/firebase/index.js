import firebase from 'firebase/app'
import 'firebase/firestore'

const db =  firebase
    .initializeApp({ projectId: 'todo-list-f5c41' })
    .firestore();



export default db;