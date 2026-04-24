import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Task } from '../../models/task';
import { formatTags } from '../../utils/tag-utils';

export type NewTaskPayload = Omit<Task, 'id' | 'isDone'>;

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @Output() taskAdded = new EventEmitter<NewTaskPayload>();
  @Output() validationError = new EventEmitter<string>();

  title = '';
  description = '';
  priority = 'low';
  dueDate = '';
  category = 'work';
  tags = '';

  titleInvalid = false;



  addTask(): void {
    const trimmedTitle = this.title.trim();
    if (!trimmedTitle) {
      this.titleInvalid = true;
      this.validationError.emit('Title is required');
      return;
    }
    this.titleInvalid = false;

    this.taskAdded.emit({
      title: trimmedTitle,
      description: this.description.trim(),
      priority: this.priority,
      dueDate: this.dueDate,
      category: this.category,
      tags: formatTags(this.tags),
    });

    this.title = '';
    this.description = '';
    this.priority = 'low';
    this.dueDate = '';
    this.category = 'work';
    this.tags = '';
  }
}
