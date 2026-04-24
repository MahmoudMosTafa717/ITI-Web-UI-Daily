import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { formatTags } from '../../utils/tag-utils';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;

  @Output() deleteTask = new EventEmitter<number | string>();
  @Output() toggleDone = new EventEmitter<number | string>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() validationError = new EventEmitter<string>();

  editing = false;

  editTitle = '';
  editDescription = '';
  editPriority = 'low';
  editDueDate = '';
  editCategory = '';
  editTags = '';

  tagParts(tags: string): string[] {
    if (!tags || !tags.trim()) {
      return [];
    }
    return tags
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }

  priorityLabel(priority: string): string {
    if (priority === 'high') {
      return 'High Priority';
    }
    if (priority === 'medium') {
      return 'Medium Priority';
    }
    return 'Low Priority';
  }

  startEdit(): void {
    this.editing = true;
    this.editTitle = this.task.title;
    this.editDescription = this.task.description;
    this.editPriority = this.task.priority;
    this.editDueDate = this.task.dueDate;
    this.editCategory = this.task.category;
    this.editTags = this.task.tags;
  }



  saveEdit(): void {
    const title = this.editTitle.trim();
    if (!title) {
      this.validationError.emit('Title is required');
      return;
    }
    this.updateTask.emit({
      ...this.task,
      title,
      description: this.editDescription.trim(),
      priority: this.editPriority,
      dueDate: this.editDueDate,
      category: this.editCategory,
      tags: formatTags(this.editTags),
    });
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  onToggleDone(): void {
    this.toggleDone.emit(this.task.id);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }
}
