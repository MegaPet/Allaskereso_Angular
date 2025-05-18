import { Component } from '@angular/core';
import { SearchBarRealComponent } from "./search-bar-real/search-bar-real.component";
import { Job } from '../../shared/Model/Job';
import { WorkDetailComponent } from './work-detail/work-detail.component';



@Component({
  selector: 'app-search',
  imports: [SearchBarRealComponent, WorkDetailComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  jobs!: Job[];
  searched = false;

  set(jobs: Job[]){
    this.jobs = jobs;
    this.searched = true;
    console.log(jobs)
  }
}
