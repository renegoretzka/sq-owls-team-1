package com.example.myapplication.ui.viewModel

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.myapplication.ui.data.Todo

class ToDoViewModel(): ViewModel() {

    val toDoState = mutableStateListOf<Todo>()

    fun addTodo(text: String, state: Boolean){
        toDoState.add(Todo(text=text,state = state))
    }

    fun updateTodoText(index:Int, text:String){
        toDoState.get(index).text=text
    }

    fun updateTodoState(index:Int, state: Boolean){
        toDoState.get(index).state=state
    }
}