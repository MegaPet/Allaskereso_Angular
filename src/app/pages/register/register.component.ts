import { Component, Input } from '@angular/core';
import { RegisterFormComponent } from "./register-form/register-form.component";
import { MessageHandlerComponent } from "../../shared/message-handler/message-handler.component";

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, MessageHandlerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() temp_msg?: { success: boolean, message: string}
}
