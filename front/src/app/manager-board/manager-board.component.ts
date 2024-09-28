import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-manager-board',
  standalone: true,
  imports: [],
  templateUrl: './manager-board.component.html',
  styleUrl: './manager-board.component.css'
})
export class ManagerBoardComponent implements OnInit{
  constructor(private userService: UserService){}
  content?: string;
  ngOnInit(): void {
    this.userService.getManagerBoard().subscribe({
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
