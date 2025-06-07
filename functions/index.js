const {onDocumentCreated} =require("firebase-functions/v2/firestore");
const { getFirestore,FieldValue } = require("firebase-admin/firestore");
const {initializeApp} = require("firebase-admin/app");

initializeApp();

exports.createBoardData=onDocumentCreated('users/{uid}/boards/{boardId}', async (event) => {
    const {uid,boardId} = event.params;
    const firestore=getFirestore();

    return await firestore.doc(`users/${uid}/boards/${boardId}`).set({
        tabs:{
            todos:[],
            inProgress:[],
            complete:[]
        },
        lastUpdated: FieldValue.serverTimestamp(),
    })
})


const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

