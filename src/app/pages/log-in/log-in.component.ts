import { Component } from '@angular/core';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Message } from '../../shared/Model/Message';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RedFontDirective } from '../../directives/red-font.directive';
import { ShadowDirective } from '../../directives/shadow.directive';

@Component({
  selector: 'app-log-in',
  imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatError, RedFontDirective, ShadowDirective],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent implements OnDestroy {
  login_form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  isLoading = false;
  authSubscription?: Subscription;
  message!: Message;


  constructor(private _login_service: LoginService, private _router: Router) {}

  onSubmit() {
    if (this.login_form.invalid) {
      return;
    }
    let temp_form = this.login_form.getRawValue();

    if (!(temp_form.email || temp_form.password)) {
      return;
    }

    this._login_service
      .signIn(temp_form.email, temp_form.password)
      .then((userCredential) => {
        console.log(`${userCredential.user} has Logged in.`);
        this.message = { success: true, message: `${userCredential.user} has logged in successfully.` } 
        this._login_service.setLogStatus(true);
        this._router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.error('Login error:', error);
        let temp_msg : Message = { success: false, message: '' }
        switch (error.code) {
          case 'auth/user-not-found':
            temp_msg.message = 'User cannot be found.'
            break;
          case 'aut/wrong-password':
            temp_msg.message = 'Incorrect password';
            break;
          case 'aut/invalid-credential':
            temp_msg.message = 'Invalid email or password.';
            break;
          default:
            temp_msg.message = 'Error accoured while trying to log you in.';
            break;
        }
        this.message = temp_msg;
      });
  }

  ngOnDestroy(): void {
      this.authSubscription?.unsubscribe();
  }

}
