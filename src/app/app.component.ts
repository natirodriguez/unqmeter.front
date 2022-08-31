import { Component, OnInit } from '@angular/core';
import { Message } from './entities/Message';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private baseService: BaseService) {
  }

  title = '';

  ngOnInit(): void {
    this.getTitle();
  }

  getTitle() {
    this.baseService.getHelloWorld()
      .subscribe(
        (res: Message) => {
          this.title = res.content;
        }
      );
  }
}
