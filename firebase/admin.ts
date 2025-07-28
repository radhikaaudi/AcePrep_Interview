import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';    
import { cert } from 'firebase-admin/app';


const initFirebaseAdmin = () => {
    const apps= getApps();

    // Check if required environment variables are present
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error('Missing required Firebase environment variables. Please check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env.local file.');
    }

    if(!apps.length)

        {
            initializeApp({
                credential:
                cert({
                    projectId: process.env.FIREBASE_PROJECT_ID as string,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.split(String.raw`\n`).join('\n') as string

                }) 
            })
        }

        return {
            auth : getAuth(),
            db: getFirestore(),
        }
}


export const { auth, db } =  initFirebaseAdmin();

