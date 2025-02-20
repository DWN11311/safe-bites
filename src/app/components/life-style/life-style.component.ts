import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-life-style',
  imports: [],
  templateUrl: './life-style.component.html',
  styleUrl: './life-style.component.css',
})
export class LifeStyleComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() width = '';
}
