import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import swal from 'sweetalert2';
import {Router} from '@angular/router'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email:any;
  senha:any;
  constructor(private fire: AngularFireAuth,private router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    //regiser new user
   this.fire.auth.createUserWithEmailAndPassword(this.email,this.senha)
   .then(data =>{

       console.log('got data',data);
       //alert('Cadastro criado com sucesso!');
       swal("Parabéns!", "Cadastro criado com sucesso!", "success");
       this.router.navigate([''])
   })
   .catch(error =>{
     console.log('got an error',error)
     // alert('Email ou senha inválido para cadastro!');
     let mensagem;
     var errorCode = error.code;
     var errorMessage = error.message;

     if(errorMessage == "auth/invalid-email"){
       mensagem  = "Email Inválido";
     }else if(errorMessage == "The email address is badly formatted."){
       mensagem = "Insira um Email válido";
     }else if(errorMessage == "Password should be at least 6 characters"){
       mensagem = "A senha precisa de no mínimo 6 caracteres";
     } else if(errorMessage == "The email address is already in use by another account."){
       mensagem = "E-mail já esta em uso.\nEscolha outro E-mail para registrar";
     } else {
       mensagem = "Email ou senha inválido para cadastro!";
     }


    swal("Atenção!", mensagem, "warning");
   });
}
}
