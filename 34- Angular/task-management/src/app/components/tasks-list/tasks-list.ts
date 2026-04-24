import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { AllTasksView } from '../all-tasks-view/all-tasks-view';
import { DoneTasksView } from '../done-tasks-view/done-tasks-view';
import { NotDoneTasksView } from '../not-done-tasks-view/not-done-tasks-view';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks-list',
  imports: [AllTasksView, DoneTasksView, NotDoneTasksView],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList implements OnInit {
  @Output() infoNotification = new EventEmitter<string>();
  @Output() validationError = new EventEmitter<string>();

  tasks: Task[] = [];
  selectedTab: 'all' | 'done' | 'not-done' = 'all';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user?.id) {
      this.apiService.getTasks(user.id).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: () => {
          this.validationError.emit('Failed to load tasks');
        }
      });
    }
  }

  tasksAll(): Task[] {
    return this.tasks;
  }

  tasksDone(): Task[] {
    return this.tasks.filter((t) => t.isDone);
  }

  tasksNotDone(): Task[] {
    return this.tasks.filter((t) => !t.isDone);
  }

  onDeleteTask(id: string | number): void {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.infoNotification.emit('Task deleted');
      },
      error: () => {
        this.validationError.emit('Failed to delete task');
      }
    });
  }

  onToggleDone(id: string | number): void {
    const selectedTask = this.tasks.find((task) => task.id === id);
    if (!selectedTask) return;

    const updatedTask = { ...selectedTask, isDone: !selectedTask.isDone };
    
    this.apiService.updateTask(updatedTask).subscribe({
      next: () => {
        this.tasks = this.tasks.map((task) => (task.id === id ? updatedTask : task));
        if (updatedTask.isDone) {
          this.infoNotification.emit('Task marked as done');
        }
      },
      error: () => {
        this.validationError.emit('Failed to update task');
      }
    });
  }

  onUpdateTask(updated: Task): void {
    this.apiService.updateTask(updated).subscribe({
      next: () => {
        this.tasks = this.tasks.map((task) => (task.id === updated.id ? updated : task));
        this.infoNotification.emit('Task updated');
      },
      error: () => {
        this.validationError.emit('Failed to update task');
      }
    });
  }
}
