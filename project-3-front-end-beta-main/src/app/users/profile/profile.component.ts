import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  flag: boolean = false;
  mainUser: User = {
    user_id: 0,
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    contact: '',
    userType: '',
    userRemoved: false
  }
​
  editUser: User ={
    user_id: 0,
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    contact: '',
    userType: '',
    userRemoved: false
  }
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  address?: string;
  contact?: string;
  showAdmin = false;
  currentUser: any;  
  errorMsg = "";
  

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
      this.currentUser = this.token.getUser();
    }
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.email = user.email;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.address = user.address;
      this.contact = user.contact;
      this.password = user.password;
​


      this.showAdmin = this.roles.includes('ROLE_ADMIN');
    }
    this.currentUser = this.token.getUser();
  }

  // getuserInfo() {
  //   this.userService.getUserInfo(Number(sessionStorage.getItem("userId"))).subscribe(
  //     (response) => {
  //       this.mainUser = response;
  //       this.editUser.userId = response.id;
  //       this.editUser.userEmail = response.email;
  //       this.editUser.userPassword = response.password;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.errorMsg = "ERROR GETTING USER INFOMATION!!!";
  //     }
  //   );
  // }
  toggleAdd(){
    if(this.flag){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }

  updatedUser(){
    console.log(this.editUser)
    this.userService.updateUserService(this.editUser).subscribe(
      (response) => {
      this.currentUser = response
     // this.router.navigate(['profile']);
    //  this.reloadPage();        
      console.log(response);
      },
    (error)=> {
        console.log(error);
      }
    );
  }

  /*reloadPage(): void{
    window.location.reload();}*/
    /* myFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
    */
}