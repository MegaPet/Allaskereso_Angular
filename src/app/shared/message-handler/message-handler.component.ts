import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShowDirective } from '../../directives/show.directive';

@Component({
  selector: 'app-message-handler',
  standalone: true,
  imports: [ShowDirective], // Make sure ShowDirective is in the imports array
  templateUrl: './message-handler.component.html',
  styleUrl: './message-handler.component.css',
})
export class MessageHandlerComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.show_success = false;
    this.show_error = false;
    console.log('message-handler:');
    console.table(this.message);
    this.message?.success
      ? (this.show_success = true)
      : (this.show_error = true);
  }
  @Input() message?: { success: boolean; message: string };
  show_success = false;
  show_error = false;
}