import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timePipe'
})
export class TimePipePipe implements PipeTransform {

  transform(timestamp: Date | Timestamp | null | undefined): string {
    if (!timestamp) {
      return 'Ismeretlen dátum';
    }

    const now = new Date();
    let date: Date;

    if (timestamp instanceof Date) {
      date = timestamp;
    } else if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
      date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    } else {
      return 'Ismeretlen dátum';
    }

    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Ma';
    } else if (days === 1) {
      return 'Tegnap';
    } else {
      return `${days} napja`;
    }
  }

}
