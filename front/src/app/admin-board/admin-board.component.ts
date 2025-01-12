import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-board',
  standalone: true,
  imports: [],
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.css'
})
export class AdminBoardComponent implements OnInit{

  content?: string;

  constructor(private userService:UserService){}

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
