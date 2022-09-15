import { Component, OnInit } from '@angular/core';
import { Presentacion } from '../../entities/Presentacion';
import { BaseService } from '../../services/base.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
}
