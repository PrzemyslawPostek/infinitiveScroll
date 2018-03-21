import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

interface ScrollPosition{
  sH: number;
  sT: number;
  cH : number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};


@Directive({
  selector: '[appInfinitScroll]'
})
export class InfinitScrollDirective implements AfterViewInit {

  private scrollEvent$;
  private userScrollDown$;
  private requestStream$;
  private requestOnScroll$;

  @Input() scrollCall;
  @Input() autoCall;
  @Input() scrollPer = 50;
 
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {

    this.listenerScrollEvent();
    this.procesScrollEvents();
    this.requestCallbackOnScroll();
  
  }

  private listenerScrollEvent(){
    this.scrollEvent$ = Observable.fromEvent(this.el.nativeElement, 'scroll');
    // console.log(this.scrollEvent$);
  }

  private procesScrollEvents(){
    this.userScrollDown$ = this.scrollEvent$
    .map((e: any): ScrollPosition => ({
      sH: e.target.scrollHeight,
      sT: e.target.scrollTop,
      cH: e.target.currnetHeight
    })).pairwise()
    .filter(positions => this.isUserScrolDown(positions) && this.isScrollExeptecPercent(positions[1]))
  }

  private requestCallbackOnScroll(){
    this.requestOnScroll$ = this.userScrollDown$;
    if(this.autoCall){
      this.requestOnScroll$ = this.requestOnScroll$
      .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
    }
    this.requestOnScroll$
    .exhaustMap(() => {return this.scrollCall(); })
    .subscribe(() => { });
    // console.log(this.scrollCall);
  }
  
  private isUserScrolDown = (positions) => {
    return positions[0].sT < positions[1].sT;
  };

  private isScrollExeptecPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPer / 100);
  }
}
