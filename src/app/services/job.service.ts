import { Injectable } from '@angular/core';
import { collection, doc, getDocs, query, QuerySnapshot, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Job } from '../shared/Model/Job';
import { Firestore } from '@angular/fire/firestore'; // AngularFire-ból importálva

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _firestore: Firestore) { }

  getJobsByCityAndCategory(varos: string, category: string): Observable<Job[]> {
    const jobsCollection = collection(this._firestore, 'jobs');
    const q = query(jobsCollection, where('Varos', '==', varos), where('Category', '==', category));

    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        const jobs: Job[] = [];
        querySnapshot.forEach(doc => {
          jobs.push(doc.data() as Job);
        });
        return jobs;
      })
    );
  }
}