import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: Notification[] = [];
  private nextId = 1;

  add(message: string, type: Notification['type']): void {
    const id = this.nextId++;
    this.notifications = [...this.notifications, { id, message, type }];

    setTimeout(() => {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    }, 3000);
  }

  getAll(): Notification[] {
    return this.notifications;
  }
}
