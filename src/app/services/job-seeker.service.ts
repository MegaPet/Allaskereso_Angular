import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, DocumentSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap, filter, tap } from 'rxjs/operators';
import { Job_seeker } from '../shared/Model/Job_seeker';
import { Auth, updateEmail, updatePassword, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  constructor(private _firestore: Firestore, private _auth: Auth) { }

  getJobSeeker(id: string): Observable<any | undefined> {
    const jobSeekerRef = doc(this._firestore, 'Job_seeker', id);
    return from(getDoc(jobSeekerRef)).pipe(
      map((snapshot: DocumentSnapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.data());
          return snapshot.data();
        } else {
          return undefined;
        }
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

  updateJobSeekerAttributes(id: string, updates: Partial<Job_seeker>): Observable<void> {
    const jobSeekerDocumentRef = doc(this._firestore, 'Job_seeker', id);
    return this.updateUserAuthDetails(id, updates.email, updates.password).pipe(
      switchMap(() => from(updateDoc(jobSeekerDocumentRef, updates)))
    );
  }

  updateUserAuthDetails(id: string, email?: string, password?: string): Observable<void> {
    return from(Promise.resolve(this._auth.currentUser)).pipe(
      filter((user): user is User => user !== null),
      switchMap((user) => {
        const updatePromises: Promise<any>[] = [];

        if (email && user.email !== email) {
          updatePromises.push(updateEmail(user, email));
        }

        if (password) {
          updatePromises.push(updatePassword(user, password));
        }

        if (updatePromises.length > 0) {
          return from(Promise.all(updatePromises)).pipe(
            map(() => undefined) 
          );
        } else {
          return of(undefined);
        }
      })
    );
  }
}