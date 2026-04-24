import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  @Input() notifications: Notification[] = [];

  alertClass(type: Notification['type']): string {
    if (type === 'warning') {
      return 'notification-item notification-item--warning';
    }
    if (type === 'error') {
      return 'notification-item notification-item--error';
    }
    if (type === 'success') {
      return 'notification-item notification-item--success';
    }
    return 'notification-item notification-item--info';
  }
}
