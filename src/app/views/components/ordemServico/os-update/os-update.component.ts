import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { OS } from 'src/app/models/OS';
import { Tecnico } from 'src/app/models/Tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OSService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  id_os=""

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

  selectedTecnico = ""

  tecnico = new FormControl(Validators.minLength(1))
  cliente = new FormControl(Validators.minLength(1))
  prioridade = new FormControl(Validators.minLength(1))
  status = new FormControl(Validators.minLength(1))
  observacoes = new FormControl("", Validators.minLength(10))

  constructor(
    private router: Router, 
    private _location: Location,
    private route: ActivatedRoute,
    private service: OSService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    ) {}

  ngOnInit(): void {
    this.id_os = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.tecnicoService.findAll().subscribe((resposta)=>{
     this.listTecnico = resposta;
    })
    this.clienteService.findAll().subscribe((resposta)=>{
     this.listCliente = resposta;
    })
    //console.log(this.listTecnico);
    
  }

  findById():void{
    this.service.findById(this.id_os).subscribe((resposta)=>{
      this.os = resposta;
      console.log(resposta);
    })
  }

  onCancel(): void {
    this._location.back();
  }


  update(): void {
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

    this.listStatus.map((status, i)=>{
      if(status === this.os.status){
        this.os.status = i
      }
    })

    this.listPrioridades.map((prioridade, i)=>{
      if(prioridade === this.os.prioridade){
        this.os.prioridade = i
      }
    })

    console.log(this.os);
    this.service.update(this.os).subscribe(
      (resposta) => {
        this.router.navigate(["os"]);
        this.service.message("Ordem de Serviço editado com sucesso!");
      },
      (err) => {
        console.log(err);
        
        if (err.error.error.match("Ordem de serviço não encontrada")) {
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
