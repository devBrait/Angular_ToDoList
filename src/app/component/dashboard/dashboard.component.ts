import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  objTask: Task = new Task();
  lstTask: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.resetForm();
    this.getAllTask();
  }

  resetForm() {
    this.objTask = new Task();
    this.addTaskValue = '';
    this.editTaskValue = '';
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.lstTask = res;
      },
      error: () => {
        alert('Impossível pegar toda a lista de tarefas');
      }
    });
  }

  addTask() {
    if (!this.addTaskValue.trim()) {
      alert('O nome da tarefa não pode ser vazio');
      return;
    }

    this.objTask.task_name = this.addTaskValue;
    this.crudService.addTask(this.objTask).subscribe({
      next: () => {
        this.getAllTask();
        this.resetForm();
        console.log(this.objTask)
      },
      error: () => {
        alert('Falha ao adicionar tarefa');
      }
    });
  }

  editTask() {
    if (!this.editTaskValue.trim()) {
      alert('O nome da tarefa não pode ser vazio');
      return;
    }

    if (!this.objTask.id) {
      alert('ID da tarefa não encontrado');
      return;
    }

    this.objTask.task_name = this.editTaskValue;
    this.crudService.editTask(this.objTask).subscribe({
      next: () => {
        this.getAllTask();
        this.resetForm();
      },
      error: () => {
        alert('Falha ao atualizar tarefa');
      }
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe({
      next: () => {
        this.getAllTask();
      },
      error: (err) => {
        alert('Erro ao deletar a tarefa');
      }
    });
  }

  call(task: Task) {
    this.objTask = task;
    this.editTaskValue = task.task_name;
  }
}
