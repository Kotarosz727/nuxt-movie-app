import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const favoritesRef = db.collection('favorites')

export const state = () => ({
    favorites: [],
})

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('favorites', favoritesRef)
    }),
    add: firestoreAction((context, {id, title, poster_path } ) => {
        if(title.trim()) {
            favoritesRef.add({
                movie_id: id,
                title: title,
                poster_path: poster_path,
                created: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }),
    remove: firestoreAction((context, id)=> {
        favoritesRef.doc(id).delete()
    }),
}