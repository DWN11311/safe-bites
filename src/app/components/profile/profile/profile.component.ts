import { Component } from '@angular/core';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { PasswordManagerComponent } from '../password-manager/password-manager.component';
import { LogoutComponent } from '../logout/logout.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileTabsComponent,
    PasswordManagerComponent,
    LogoutComponent,
    PersonalInformationComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  selectedTab = 0;
}
