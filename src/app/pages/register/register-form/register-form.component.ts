import {
  Component,
  EventEmitter,
  inject,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    MatProgressBarModule,
    MatInput,
    MatError,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  role: 'company' | 'job_seeker' = 'job_seeker';
  register_form = new FormGroup({
    role: new FormControl<'company' | 'job_seeker'>(this.role, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    password_1: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_2: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  progress: number = 0;
  can_register = this.progress < 5;
  @Output() msg = new EventEmitter<{
    success: boolean;
    message: string;
  }>();
  private _login_service = inject(LoginService);

  countErrors() {
    this.progress = 0;

    Object.keys(this.register_form.controls).forEach((key) => {
      let f = this.register_form.get(key);
      this.progress += f?.valid
        ? key === 'password_2'
          ? !this.password_compare()
            ? 1
            : 0
          : 1
        : 0;
      this.can_register = this.progress < 5;
    });
  }
  password_compare() {
    const p_1 = this.register_form.get('password_1')?.value;
    const p_2 = this.register_form.get('password_2')?.value;
    return p_1 && p_2 && p_1 !== p_2;
  }

  ngOnInit() {
    this.register_form.valueChanges.subscribe(() => {
      this.countErrors();
    });
  }

  submit() {
    if (this.register_form.invalid) {
      return;
    }
    const temp_form = this.register_form.getRawValue();

    if (!temp_form.email || !temp_form.name) {
      return;
    }

    if (temp_form.password_1 !== temp_form.password_2) {
      return;
    }

    this._login_service
      .signUp(temp_form.email as string, temp_form.password_1 as string, {
        name: temp_form.name,
        job_ids: [],
      })
      .then((userCredentials) => {
        this._login_service.signIn(
          temp_form.email as string,
          temp_form.password_1 as string
        );
        this.msg.emit({ success: true, message: "Sikeres regisztráció."})
      })
      .catch((error) => {
        this.msg.emit({ success: false, message: error as string });
      });
  }
}
