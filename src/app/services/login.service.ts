import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Job_seeker } from '../shared/Model/Job_seeker';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _log_key = 'logged_in';
  private _google_provider = new GoogleAuthProvider();

  current_user: Observable<User | null>;
  constructor(
    private _auth: Auth,
    private _router: Router,
    private _firestore: Firestore
  ) {
    this.current_user = authState(this._auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    localStorage.setItem(this._log_key, 'true');
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem(this._log_key, 'false');
    return signOut(this._auth).then(() => {
      this._router.navigateByUrl('/home');
    });
  }

  async signUp(
    email: string,
    password: string,
    userData: Partial<Job_seeker>
  ): Promise<UserCredential> {    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      console.log("userCredential", userCredential)
      const completeUserData: Job_seeker = {
        email: userCredential.user.email ?? '',
        password: '',
        id: userCredential.user.uid,
        job_ids: [],
        name: userData.name ?? '',
      };
      console.table(completeUserData);

      const { password: _, ...safeData } = completeUserData;



      await this.createJob_seekerData(userCredential.user.uid, safeData);

      return userCredential;
    } catch (err) {
      console.error("Error in login_service: ",err);
      throw err;
    }
  }

  private async createJob_seekerData(
    userId: string,
    userData: Omit<Job_seeker, 'password'>
  ): Promise<void> {
    const userRef = doc(collection(this._firestore, 'Job_seeker'), userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this._log_key) === 'true';
  }

  setLogStatus(status: Boolean): void {
    localStorage.setItem(this._log_key, JSON.stringify(status));
  }
}
