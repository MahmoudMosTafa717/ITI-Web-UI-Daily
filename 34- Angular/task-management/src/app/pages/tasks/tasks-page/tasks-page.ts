import { Component, OnInit } from '@angular/core';
import { TasksList } from '../../../components/tasks-list/tasks-list';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-tasks-page',
  imports: [TasksList],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage implements OnInit {
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  onInfoNotification(message: string): void {
    this.notificationService.add(message, 'info');
  }

  onValidationError(message: string): void {
    this.notificationService.add(message, 'warning');
  }
}
