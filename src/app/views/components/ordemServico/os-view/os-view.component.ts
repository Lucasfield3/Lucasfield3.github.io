import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OS } from 'src/app/models/OS';
import { OSService } from 'src/app/services/os.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  id_os=""

  os: OS = {
    tecnico:"",
    cliente:"",
    prioridade:"",
    status:"",
    observacoes: "",
  };

  constructor(
    private route: ActivatedRoute,
    private service: OSService,
    private _location: Location
    ) {}

  ngOnInit(): void {
    this.id_os = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  findById():void{
    this.service.findById(this.id_os).subscribe((resposta)=>{
      this.os = resposta;
      console.log(resposta);
    })
  }

  voltar():void{
    this._location.back();
  }


 
}
