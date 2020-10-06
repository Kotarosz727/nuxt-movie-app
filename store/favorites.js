import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const favoritesRef = db.collection('favorites')

export const state = () => ({
    favorites: [],
    detail: ''
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
        let intId = Number(id)
        var favorites = favoritesRef.where('movie_id', '==', intId);

        favorites.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
        });
    }),
    getDetail: firestoreAction((context, id)=>  {
         state.detail = favoritesRef.where('movie_id', '==', 'id').get()   
    })
}