import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-board',
  standalone: true,
  imports: [],
  templateUrl: './user-board.component.html',
  styleUrl: './user-board.component.css'
})
export class UserBoardComponent implements OnInit{
  content?:string;
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next:data => {
        this.content = data;
      },
      error:err => {
        console.log(err);
        if(err.error){
          this.content = JSON.parse(err.error).message;
        }else{
          this.content = "Error with this status: "+err.status;
        }
      }
    });
  }

}
