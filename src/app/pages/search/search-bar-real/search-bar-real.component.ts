import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Job } from '../../../shared/Model/Job';
import { JobService } from '../../../services/job.service';
import { PointerDirective } from '../../../directives/pointer.directive';

@Component({
  selector: 'app-search-bar-real',
  imports: [MatLabel, MatFormField, MatInput, ReactiveFormsModule, PointerDirective],
  templateUrl: './search-bar-real.component.html',
  styleUrl: './search-bar-real.component.css',
})
export class SearchBarRealComponent {
  search_form = new FormGroup({
    category: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  @Output() jobs = new EventEmitter<Job[]>();
  private _job_service = inject(JobService);
  submit() {
    if (this.search_form.invalid) {
      return;
    }
    let temp_form = this.search_form.getRawValue();
    if (!temp_form.category && !temp_form.city) {
      return;
    }

    this._job_service
      .getJobsByCityAndCategory(temp_form.city, temp_form.category)
      .subscribe((response: Job[]) => {
        const _jobs = response
        this.jobs.emit(_jobs);
      });
  }
}
