import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../models/task';

@Component({
  selector: 'app-done-tasks-view',
  imports: [TaskCard],
  templateUrl: './done-tasks-view.html',
  styleUrl: './done-tasks-view.css',
})
export class DoneTasksView implements OnDestroy {
  @Input() tasks: Task[] = [];

  @Output() deleteTask = new EventEmitter<number | string>();
  @Output() toggleDone = new EventEmitter<number | string>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() validationError = new EventEmitter<string>();
  @Output() componentClosed = new EventEmitter<string>();

  ngOnDestroy(): void {
    this.componentClosed.emit('Done Tasks component closed');
  }
}
