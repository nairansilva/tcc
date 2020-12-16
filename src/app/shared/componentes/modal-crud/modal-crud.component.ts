import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-crud',
  templateUrl: './modal-crud.component.html',
  styleUrls: ['./modal-crud.component.css']
})
export class ModalCrudComponent implements OnInit {

  public display = 'none';
  @Input() title: string;
  @Input() hideButton = false;

  displayClassSideBar = 'backGroud-sidebar animate-right';
  displayClassBackGround = 'sidebar bar-block card animate-right';

  constructor() {}

  ngOnInit(): void {
  }

  clickOut(e): void {
    const modal = document.getElementById('teste');
    if (e.target === modal) {
      this.closeRightMenu();
    }
  }
  openRightMenu(): void {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";
    // this.display = 'block';
    // this.displayClassBackGround = 'bar-block backGroud-sidebar animate-right';
    // this.displayClassSideBar = 'sidebar bar-block card animate-right';
  }

  closeRightMenu(): void {
    this.displayClassSideBar = 'sidebar bar-block card animate-right-close';
    this.displayClassBackGround = 'backGroud-sidebar animate-right-close';
  }

}
