import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { UrlSerializer } from 'ionic-angular';

@Injectable()
export class AuthService {
	public user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}
    getUserEmail():string{
        return this.user.email;
    }
	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password).then(
                 ()=>console.log('user logged'),
                 error=>console.log(error.message)
             );
	}
    signUp(credentials) {
        try {
         return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
            ()=>console.log('user created'),
            error=>console.log(error.message));

        } catch (error) {
            console.log('hata '+error);
        }
    }
    getUserName(){
        return this.user.displayName;        
    }
    getUserId(){
        return this.user.uid;
    }
    setUserName(username){
        this.user.updateProfile({
            displayName: username,
            photoURL: ''
           }).then(function() {
            console.log('update başarılı')
          }).catch(function(error) {
            console.log('update başarısız');
          });
    }
    //#region googleAuth
    /*
    signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}

private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				alert(error.message);
			});
		});
	}
}*/
    //#endregion
}