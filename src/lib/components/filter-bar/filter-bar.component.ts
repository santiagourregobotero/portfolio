import { outputAst } from '@angular/compiler';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Input() filter_list: string[] = [];
  @Input() total: number = 0;
  @Input() current_count: number = 0;
  @Output() currentChanged = new EventEmitter<number>();

  current_index: number = 0;

  ngOnInit(): void {}

  set_current(current: number = 0) {
    this.current_index = current;
    this.currentChanged.emit(current);
  }
}
