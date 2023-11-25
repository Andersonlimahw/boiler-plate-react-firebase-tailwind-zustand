// REF: https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

import { 
    collection, 
    addDoc, 
    Timestamp, 
    query, 
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
    getDoc, 
    onSnapshot,
    collectionGroup,
    where
} from 'firebase/firestore';
import { db , auth }  from './firebaseConfig';

import { 
    GetInput, 
    GetByIdInput, 
    GetByIdResponse,
    UpdateInput,
    UpdateResponse,
    DeleteInput,
    DeleteResponse,
    CreateInput,
    CreateResponse,
    GetGroupedInput,
    GetMessagesInput
} from './interfaces';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from '@firebase/auth';


export const create = async ({ collectionName, payload } : CreateInput) : Promise<CreateResponse> => {
    try { 
        console.log('[Firebase][Add] - Init - payload: ', payload);
        const response = await addDoc(collection(db, collectionName), {
            ...payload,
            created: Timestamp.now()
        });
        console.log('[Firebase][Add] - Success - response: ', response, 'id: ', response.id, ' payload: ', payload);
        return {
            id: response.id,
        };
    } catch(ex) {
        console.error('[Firebase][Add] - Error: ', ex);
        throw new Error(`Error to create document: ${ex}`);
    }
}

export const list = async ({ collectionName } : GetInput) => {
    try { 
        const response = query(
            collection(db, collectionName), 
            orderBy('created', 'asc')
        );       
        console.log('[Firebase][get] - Success - url: ', collectionName, ' response: ', response);
        return response;
    } catch(ex) {
        console.error('[Firebase][get] - Error: ', ex);
        throw new Error(`Error to get document: ${ex}`);
    }
}

export const get = async ({ collectionName, userId } : GetInput) => {
    try { 
        const response = query(
            collection(db, collectionName), 
            where('userId', '==', userId),
            orderBy('created', 'asc')
        );       
        console.log('[Firebase][get] - Success - url: ', collectionName, ' response: ', response);
        return response;
    } catch(ex) {
        console.error('[Firebase][get] - Error: ', ex);
        throw new Error(`Error to get document: ${ex}`);
    }
}


export const getGroupdByEmail = async ({ collectionName, email } : GetGroupedInput) => {
    try { 
        let result;
        const response = query(
            collectionGroup(db, collectionName), 
            where('to', '==', email)
        );       
        console.log('[Firebase][getGroupdByEmail] - Success - response: ', result, response);
        return response;
    } catch(ex) {
        console.error('[Firebase][getGroupdByEmail] - Error: ', ex);
        throw new Error(`Error to create document: ${ex}`);
    }
}

export const getById = async ({ collectionName, id } : GetByIdInput) : Promise<GetByIdResponse> => {
    try { 
        if(!id) {
            throw new Error(`Error to getById id: ${id}`);
        }
        const documentRefById = await doc(db, collectionName, id);
        const response = await getDoc(documentRefById);
        console.log('[Firebase][getById] - Success - response: ', response, ' collectionName: ', collectionName);
        return {
            ...response,
            id: response.id,
            data: response.data()
        };
    } catch(ex) {
        console.error('[Firebase][getById] - Error: ', ex, 'Input: ', collectionName, id);
        throw new Error(`Error to getById document: ${ex}`);
    }
}

export const getContactsByUserId = async ({ collectionName, id } : GetByIdInput) => {
    try { 
        const resolvedCollectionName = `${collectionName}/${id}/contacts`;
        const response = query(
            collection(db, resolvedCollectionName), 
            orderBy('created', 'asc')
        );               
        console.log('[Firebase][getMessagesByUserId] - Success - response: ', response , ' resolvedCollectionName: ', resolvedCollectionName);
        return response;
    } catch(ex) {
        console.error('[Firebase][get] - Error: ', ex);
        throw new Error(`Error to getById document: ${ex}`);
    }
}

export const getMessagesByContactUserId = async ({ collectionName, userId, contactUid } : GetMessagesInput) => {
    try { 
        const response = query(
            collection(db, collectionName), 
            where('userId', 'in', [userId, contactUid]),
            // where('contactUid', '==', contactUid),
            orderBy('created', 'asc')
        );               
        console.log('[Firebase][getMessagesByUserId] - Success - response: ', response , ' resolvedCollectionName: ', collectionName);
        return response;
    } catch(ex) {
        console.error('[Firebase][get] - Error: ', ex);
        throw new Error(`Error to getById document: ${ex}`);
    }
}

export const update = async ({ collectionName, id, payload } : UpdateInput) : Promise<UpdateResponse> => {
    try { 
        const documentRefById = await doc(db, collectionName, id);
        const response  = await updateDoc(documentRefById, {
            ...payload,
            updatedAt: Timestamp.now()
        })
        console.log('[Firebase][update] - Success - response: ', response, ' payload: ', payload);
        return {
            id: id, 
            success: true,
            date: Timestamp.now()
        }
    } catch(ex) {
        console.error('[Firebase][update] - Error: ', ex);
        throw new Error(`Error to update document: ${ex}`);
    }
}

export const deleteById = async ({ collectionName, id } : DeleteInput) : Promise<DeleteResponse> => {
    try { 
        const documentRefById = await doc(db, collectionName, id);
        const response = await deleteDoc(documentRefById);

        console.log('[Firebase][deleteById] - Success - response: ', response);
        return {
            id: id,
            success: true,
            date: Timestamp.now()
        };
    } catch(ex) {
        console.error('[Firebase][deleteById] - Error: ', ex);
        throw new Error(`Error to deleteById document: ${ex}`);
    }
}

export const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Login com o Google bem-sucedido
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao executar login.');
      // Tratar erros de login com o Google
    }
  };