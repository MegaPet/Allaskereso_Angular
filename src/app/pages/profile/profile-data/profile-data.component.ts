import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User_data } from '../../../shared/Model/User_data';
import { JobSeekerService } from '../../../services/job-seeker.service';
import { Job_seeker } from '../../../shared/Model/Job_seeker';

@Component({
  selector: 'app-profile-data',
  imports: [],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent implements OnChanges {
  @Input() user_data!: User_data;
  private _job_seeker = inject(JobSeekerService)
  legit_user_data !: Job_seeker;
  ngOnChanges(): void {
    if(!this.user_data){
      return;
    }

    console.log("profile-data")
    console.log(this.user_data.id)
    this._job_seeker.getJobSeeker(this.user_data.id).subscribe(
      (data) => {
        console.log(data);
        this.legit_user_data = {
          email: data.email,
          name: data.name,
          id : data.id,
          password: '',
          job_ids : data.job_ids
        }
      }
    )
  }
}
