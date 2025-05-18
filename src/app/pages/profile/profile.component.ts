import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { User_data } from '../../shared/Model/User_data';
import { ModifyFormComponent } from './modify-form/modify-form.component';
import { Message } from '../../shared/Model/Message';
import { MessageHandlerComponent } from '../../shared/message-handler/message-handler.component';
import { ShowDirective } from '../../directives/show.directive';

@Component({
  selector: 'app-profile',
  imports: [ MatButtonModule, ProfileDataComponent, ModifyFormComponent, MessageHandlerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  msg!: Message;
  currentUser !: User_data;
  private _login_service = inject(LoginService);
  constructor() {
    let _currentUser = this._login_service.current_user;
    _currentUser.subscribe(user => {
      if (user) {
      const valami = user;
      console.log(valami.uid);
      this.currentUser = { id: user.uid, email: user.email as string} 
      }
    });
  }



  logOut(){
    this._login_service.signOut();
  }
}
