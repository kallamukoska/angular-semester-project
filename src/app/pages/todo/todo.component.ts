import { Component, OnInit } from '@angular/core';
import { TodoCardComponent, ITodoStatus } from '../../shared/components/todo-card/todo-card.component';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'; 
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})


export class TodoComponent implements OnInit{
  todos: ITodo[] = [];
  todoForm!: FormGroup;
  isSlidePanelOpen = false;
  todoStatus = ITodoStatus;

  constructor(private todoService: TodoService, private fb: FormBuilder){
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todos = this.todoService.getAllTodo();
  }

  openSlidePanel(){
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel(){
    this.isSlidePanelOpen = false;
    this.todoForm.reset();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const newTodo: ITodo = {
        title: this.todoForm.value.title,
        description: this.todoForm.value.description,
        status: this.todoForm.value.status,
        isVisible: true
      };
  
      this.todoService.addTodo(newTodo); 
      this.todoForm.reset(); 
      this.isSlidePanelOpen = false; 
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  statusOpen(){
    for(let todo of this.todos){
      if(todo.status === 'OPEN'){
        todo.isVisible = true;
      }else{
        todo.isVisible = false;
      }
    }
  }
  statusProgress(){
    for(let todo of this.todos){
      if(todo.status === 'PROGRESS'){
        todo.isVisible = true;
      }else{
        todo.isVisible = false;
      }
    }
  }

  statusTesting(){
    for(let todo of this.todos){
      if(todo.status === 'TESTING'){
        todo.isVisible = true;
      }else{
        todo.isVisible = false;
      }
    }
  }

  statusDone(){
    for(let todo of this.todos){
      if(todo.status === 'DONE'){
        todo.isVisible = true;
      }else{
        todo.isVisible = false;
      }
    }
  }

  statusAll(){
    for(let todo of this.todos){
      todo.isVisible = true;
    }
  }
}
