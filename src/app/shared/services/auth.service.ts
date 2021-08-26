import { Injectable, NgZone } from '@angular/core';
import { User } from "./models/user";
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    SignIn(email: string, password: string) : Observable<User>{

        return from(this.afAuth.signInWithEmailAndPassword(email,password)).pipe(map(data => {
            this.SetUserData(data.user);
            this.ngZone.run(() => {
                this.router.navigate(['home']);
            });
            return data.user;
        }))
    }

    // Sign up with email/password
    SignUp(email: string, password: string) {
        return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(map(data => {
            this.SendVerificationMail();
            this.SetUserData(data.user);
            this.ngZone.run(() => {
                this.router.navigate(['home']);
            });
            return data.user;
        }));
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

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userDoc: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userDoc.set(userData, {
            merge: true
        })
    }

    // Sign out 
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        })
    }
}