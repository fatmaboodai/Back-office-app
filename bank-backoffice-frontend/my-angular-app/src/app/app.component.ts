import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers:[DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
  data:string[]= [];
  constructor(private dataservice:DataService){
    this.data = this.dataservice.getData()
  }

}
