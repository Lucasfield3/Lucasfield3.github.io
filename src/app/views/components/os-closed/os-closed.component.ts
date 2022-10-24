import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/OS';
import { ClienteService } from 'src/app/services/cliente.service';
import { OSService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements OnInit, AfterViewInit {

  lista: OS[] = [];
  tecnicoName:string = ''
  clienteName:string = ''

  displayedColumns: string[] = ['tecnico', 'cliente', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OSService,
    private cliente: ClienteService,
    private tecnico: TecnicoService,
    private router: Router
    ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  ngOnInit(): void {
  }

  findAll():void {

    this.service.findAll().subscribe((resposta)=> {
      console.log(resposta);
      
      // resposta.map((item)=>{
      //   if(item.status === 'ENCERRADO'){
      //     this.lista.push(item)
      //   }
      // })
      this.lista = resposta.filter((item)=> item.status === 'ENCERRADO')
      this.findTecnicoById();
      this.findClienteById();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.paginator);
      console.log(this.lista);
      
    })
  }

  findClienteById():void {
    this.lista.map((item)=>{
      this.cliente.findById(item.cliente).subscribe((resposta)=> {
        item.cliente = resposta.nome
      })
    })
  }

  findTecnicoById():void {
    this.lista.map((item)=>{
      this.tecnico.findById(item.tecnico).subscribe((resposta)=> {
        item.tecnico = resposta.nome
      })
    })
  }


  handleColors(name:string, element:any):string {
   let color:string =''
    if(name === 'status'){
      if(element === "ABERTO"){
        color = 'aberto'
      }
 
      if(element === "ANDAMENTO"){
        color = 'andamento'
      }
 
      if(element === "ENCERRADO"){
        color = 'encerrado'
      }
    }

      
      if(name === 'prioridade'){
        if(element=== "BAIXA"){
          color = 'baixa'
        }
  
        if(element=== "MEDIA"){
          color = 'media'
        }
  
        if(element=== "ALTA"){
          color = 'alta'
        }
      }
   return color;
  }

  navigateToCreate():void {
    this.router.navigate(['os/create'])
  }

}
