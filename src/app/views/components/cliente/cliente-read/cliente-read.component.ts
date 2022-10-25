import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit, OnInit  {

  clientes: Cliente[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router,
    private cdRef : ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta)=> {
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    })
    this.loading = false;
  }

  navigateToCreate():void {
    this.router.navigate(['clientes/create'])
  }

}
