import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private roles : string[] = [];
  isLoggiedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  username?: string

  constructor(private storageService: StorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.isLoggiedIn = this.storageService.isLoggedIn();

    if(this.isLoggiedIn){
      const currentUser = this.storageService.getUser();
      this.roles = currentUser.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      

      this.username = currentUser.name;
    }
  }

  logout():void{
    this.authService.logout().subscribe({
      next:res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err =>{
        console.log(err);
        
      }
    });
  }
}
