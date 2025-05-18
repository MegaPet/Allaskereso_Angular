import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { Message } from '../../../shared/Model/Message';
import { User_data } from '../../../shared/Model/User_data';
import { JobSeekerService } from '../../../services/job-seeker.service';
import { MatInput } from '@angular/material/input';
import { Job_seeker } from '../../../shared/Model/Job_seeker';

@Component({
  selector: 'app-modify-form',
  imports: [
    MatFormFieldModule,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
  ],
  templateUrl: './modify-form.component.html',
  styleUrl: './modify-form.component.css',
})
export class ModifyFormComponent {
  @Input() user_data!: User_data;
  register_form = new FormGroup({
    email: new FormControl<string>('', [Validators.email]),
    name: new FormControl<string>(''),
    password_1: new FormControl<string>('', [Validators.minLength(6)]),
    password_2: new FormControl<string>('', [Validators.minLength(6)]),
  });

  can_register: boolean = false;
  @Output() msg = new EventEmitter<Message>();
  private _job_seeker_service = inject(JobSeekerService);

  password_compare() {
    const p_1 = this.register_form.get('password_1')?.value;
    const p_2 = this.register_form.get('password_2')?.value;
    return p_1 && p_2 && p_1 !== p_2;
  }

  submit() {
    if (this.register_form.invalid) {
      this.msg.emit({
        success: false,
        message: 'Kérlek, javítsd a formon lévő hibákat!',
      });
      return;
    }

    let updates: Partial<Job_seeker> = {}; // Feltételezve, hogy a user_data típusa User_data
    const temp_form = this.register_form.getRawValue();

    if (temp_form.email) {
      updates.email = temp_form.email;
    }
    if (temp_form.name) {
      updates.name = temp_form.name;
    }
    if (this.password_compare()) {
      updates.password = temp_form.password_1 as string;
    }

    
    if (Object.keys(updates).length === 0) {
      this.msg.emit({ success: false, message: 'No data to update.' });
      return;
    }

    if (!this.user_data?.id) {
      this.msg.emit({
        success: false,
        message: 'No ID.',
      });
      return;
    }

    this._job_seeker_service
      .updateJobSeekerAttributes(this.user_data.id, updates)
      .subscribe({
        next: () => {
          this.msg.emit({
            success: true,
            message: 'A felhasználói adatok sikeresen frissítve!',
          });
          this.register_form.markAsPristine(); // Form jelölése változatlannak
        },
        error: (error) => {
          this.msg.emit({
            success: false,
            message: `Hiba a frissítés során: ${error.message}`,
          });
        }
      });
  }
}
