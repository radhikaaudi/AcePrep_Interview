import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';    
import { cert } from 'firebase-admin/app';


const initFirebaseAdmin = () => {
    const apps= getApps();

    try {
        // Check if required environment variables are present
        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
            console.error('Missing required Firebase environment variables. Please check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env.local file.');
            return {
                auth: null,
                db: null,
            };
        }

        // Process the private key to handle different formats
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;
        
        // If the key doesn't start with -----BEGIN, it might be base64 encoded
        if (!privateKey.startsWith('-----BEGIN')) {
            try {
                privateKey = Buffer.from(privateKey, 'base64').toString('utf8');
            } catch (e) {
                console.error('Failed to decode base64 private key');
            }
        }
        
        // Replace escaped newlines with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');

        if(!apps.length) {
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey

                })
            });
        }

        return {
            auth: getAuth(),
            db: getFirestore(),
        };
    } catch (error) {
        console.error('Failed to initialize Firebase Admin:', error);
        return {
            auth: null,
            db: null,
        };
    }
}


export const { auth, db } =  initFirebaseAdmin();

