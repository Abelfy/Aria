import { Injectable, NgZone } from '@angular/core';
import { User } from "./models/user";
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthInfo } from './models/authInfo';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    static UNKNOWN_USER = new AuthInfo(null);

    userData: any; // Save logged in user data

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;
    pictureUrl$ : Observable<string>;
    authInfo$: BehaviorSubject<AuthInfo>;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        private messageService: MessageService,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                this.userData = JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                this.userData = JSON.parse(localStorage.getItem('user'));
            }
        });
        this.authInfo$ = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

        this.isLoggedIn$ = afAuth.authState.pipe(map(user=> !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        this.pictureUrl$ = afAuth.authState.pipe(map(user => user ? user.photoURL : null));

    }

    // Sign in with email/password
    SignIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                this.messageService.add({key: 'bc', severity: 'success', summary: 'Vous êtes connecté ! '});
                this.ngZone.run(() => {
                    this.router.navigate(['home']);
                });                
            }).catch((error) => {
                this.messageService.add({severity:'error', summary: 'Erreur', detail:error.message});
            })
    }

    // Sign up with email/password
    SignUp(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign 
                up and returns promise */
                this.SendVerificationMail();
                this.SetUserData(result.user);
            }).catch((error) => {                
                this.messageService.add({severity:'error', summary: 'Erreur', detail:error.message});
                window.alert(error.message)
            })
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.currentUser.then(user => {
            user.sendEmailVerification().then(() => {
                this.router.navigate(['verify-email-address']);
            })
        })
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Returns true when user is looged in and email is verified
    /* get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    } */

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.router.navigate(['home']);
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error)
            })
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        console.log(user);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    // Sign out 
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        })
    }

    fromFirebaseAuthPromise(promise):Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                    //const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
                    //this.authInfo$.next(authInfo);
                    subject.next(res);
                    subject.complete();
                },
                err => {
                    this.authInfo$.error(err);
                    subject.error(err);
                    subject.complete();
                });

        return subject.asObservable();
    }
}