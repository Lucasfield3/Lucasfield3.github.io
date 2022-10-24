import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { OS } from 'src/app/models/OS';
import { Tecnico } from 'src/app/models/Tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OSService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {
  os: OS = {
    tecnico:"",
    cliente:"",
    prioridade:"",
    status:"",
    observacoes: "",
  };

  listTecnico:Tecnico[] = []
  listCliente:Cliente[] = []
  listStatus:string[] = ["ABERTO", "ANDAMENTO", "ENCERRADO"]
  listPrioridades:string[] = ["BAIXA", "MEDIA", "ALTA"]

  tecnico = new FormControl(Validators.minLength(1))
  cliente = new FormControl(Validators.minLength(1))
  prioridade = new FormControl(Validators.minLength(1))
  status = new FormControl(Validators.minLength(1))
  observacoes = new FormControl("", Validators.minLength(10))

  constructor(private router: Router, 
    private service: OSService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
    ) {}

  ngOnInit(): void {
    this.tecnicoService.findAll().subscribe((resposta)=>{
     this.listTecnico = resposta;
    })
    this.clienteService.findAll().subscribe((resposta)=>{
     this.listCliente = resposta;
    })
    //console.log(this.listTecnico);
    
  }

  onCancel(): void {
    this.router.navigate(["os"]);
  }


  create(): void {
    console.log(this.listTecnico);
    
    this.listTecnico.map((tecnico)=>{
        if(tecnico.nome === this.os.tecnico){
          this.os.tecnico = tecnico.id
        }
    })
    this.listCliente.map((cliente)=>{
        if(cliente.nome === this.os.cliente){
          this.os.cliente = cliente.id
        }
    })

    console.log(this.os);
    this.service.create(this.os).subscribe(
      (resposta) => {
        this.router.navigate(["os"]);
        this.service.message("Ordem de Serviço criado com sucesso!");
      },
      (err) => {
        console.log(err);
        
        if (err.error.error.match("Cliente não encontrado")) {
          this.service.message("Cliente não encontrado");
        }else if(err.error.error.match("Tecnico não encontrado")){
          this.service.message("Tecnico não encontrado");
        }
      }
    );
  }

  errorValidTecnico(){
    if(this.tecnico.invalid){
      return 'O tecnico deve ter entre 5 e 100 caracteres'
    }

    return false;
  }

  errorValidCliente(){
    if(this.cliente.invalid){
      return 'O cliente deve ter entre 11 e 15 caracteres'
    }

    return false;
  }
  errorValidPrioridade(){
    if(this.prioridade.invalid){
      return 'O prioridade deve ter entre 11 e 18 caracteres'
    }

    return false;
  }

  errorValidStatus(){
    if(this.status.invalid){
      return 'status deve ter entre 11 e 18 caracteres'
    }

    return false;
  }
  errorValidObservacoes(){
    if(this.observacoes.invalid){
      return 'Observações deve ter entre 11 e 18 caracteres'
    }

    return false;
  }

}
