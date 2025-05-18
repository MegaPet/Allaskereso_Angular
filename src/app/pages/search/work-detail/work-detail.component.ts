import { Component, Input } from '@angular/core';
import { Job } from '../../../shared/Model/Job';
import { WagePipePipe } from '../../../pipes/wage-pipe.pipe';
import { TimePipePipe } from '../../../pipes/time-pipe.pipe';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-work-detail',
  imports: [WagePipePipe, TimePipePipe, MatCardModule],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css'
})
export class WorkDetailComponent {
  @Input() job !: Job;
}
