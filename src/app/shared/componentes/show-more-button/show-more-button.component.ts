import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-more-button',
  templateUrl: './show-more-button.component.html',
  styleUrls: ['./show-more-button.component.css']
})
export class ShowMoreButtonComponent implements OnInit {

  @Input() hasNext;
  @Input() loadingSearch;
  @Output() showMore = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {}

  showMoreAction(): void {
    this.showMore.emit();
  }

}
