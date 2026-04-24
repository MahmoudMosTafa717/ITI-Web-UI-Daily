import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form, NewTaskPayload } from '../../../components/form/form';
import { Task } from '../../../models/task';
import { NotificationService } from '../../../services/notification.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-task-page',
  imports: [Form],
  templateUrl: './add-task-page.html',
  styleUrl: './add-task-page.css',
})
export class AddTaskPage {
  constructor(
    private notificationService: NotificationService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  onTaskAdded(payload: NewTaskPayload): void {
    const user = this.authService.getCurrentUser();
    const task: Omit<Task, 'id'> = {
      ...payload,
      isDone: false,
      userId: user?.id
    };

    this.apiService.addTask(task as Task).subscribe({
      next: () => {
        this.notificationService.add('Task created successfully', 'info');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.notificationService.add('Failed to create task', 'error');
      }
    });
  }

  onValidationError(message: string): void {
    this.notificationService.add(message, 'warning');
  }
}
