import { Component} from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  index: number = 1;
  i: number = 1;
  img: Array<any> = [];
  imgPack:Array<any> = [];
  // imgHits: string = this.img;

  scrollCall;

  constructor(private DataService: DataService){

    this.scrollCall = this.getData.bind(this);

  }

    getData(){
      return this.DataService.getData().do(this.processData);
    }

    private processData = (imgJson) => {
     this.img = this.img.concat(imgJson.json());
     console.log(imgJson);
     
     for(this.i = 0; this.i < 50; this.i++){
       this.imgPack.push(this.img[0].hits[this.index]);
       this.index = this.index + 1;
      //  console.log(imgJson);
       console.log(this.img);
       console.log(this.imgPack);
       
     }
    }
  }
