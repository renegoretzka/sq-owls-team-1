package com.example.myapplication.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.List
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.myapplication.ui.data.StateVars
import com.example.myapplication.ui.data.StateVars.textState
import com.example.myapplication.ui.data.Todo
import com.example.myapplication.ui.viewModel.ToDoViewModel


@Composable
fun ToDoScreen() {

    val viewModel: ToDoViewModel = viewModel()
    val todoList = viewModel.toDoState

    if(StateVars.cardId != -1) {
        StateVars.checkBoxState = todoList[StateVars.cardId].state
        StateVars.text= todoList[StateVars.cardId].text
        StateVars.openDialog = true
    }else{

    }

    Scaffold(topBar = {},
        floatingActionButton = {
            ExtendedFloatingActionButton(
                icon = { Icon(Icons.Filled.Add, "") },
                text = { Text("Add")},
                onClick = {  StateVars.openDialog = true },
                elevation = FloatingActionButtonDefaults.elevation(8.dp)
            )
        },

        content = {
            ShoppingListSection(todoList, viewModel)
        })
}

@Composable
private fun ShoppingListSection(
    todoList: SnapshotStateList<Todo>,
    viewModel: ToDoViewModel
) {
    Column(
        modifier = Modifier
            .background(Color.White)
            .verticalScroll(rememberScrollState())
            .padding(start = 45.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        for ((index, toDo) in todoList.withIndex()) {
            ShoppingRow(index, viewModel, toDo)
        }
        if (StateVars.openDialog) {
            AddOrEditDialog(viewModel)
        }
    }
}

@Composable
private fun ShoppingRow(
    index: Int,
    viewModel: ToDoViewModel,
    toDo: Todo
) {
    Card(
        backgroundColor = Color.White,
        modifier = Modifier
            .fillMaxWidth()
            .padding(6.dp)
            .pointerInput(Unit) {
                detectTapGestures(
                    onLongPress = {
                        StateVars.cardId = index
                        StateVars.editingMode = true
                    }
                )
            }
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            StateVars.textState = TextFieldValue(viewModel.toDoState[index].text)
            TextField(
                value = textState,
                onValueChange = {
                    textState = it
                    viewModel.updateTodoText(index, it.text)
                }
            )
             StateVars.checkedState = toDo.state
            Checkbox(
                checked = StateVars.checkedState,
                onCheckedChange = {
                    StateVars.checkedState = it
                    viewModel.updateTodoState(index, it)
                    print("Updated State: " + viewModel.toDoState[index].state)
                }
            )
        }

    }
}

@Composable
private fun AddOrEditDialog(viewModel: ToDoViewModel) {
    if(StateVars.editingMode == false){
        AddNewDialog(viewModel)
    }else{
        EditDialog(viewModel)
    }
}




@Composable
private fun EditDialog(viewModel: ToDoViewModel) {
    AlertDialog(
        onDismissRequest = {
            StateVars.openDialog = false
            StateVars.cardId = -1
            StateVars.editingMode = false
        },
        title = {
            Text(text = "Item name and amount")
        },
        text = {
            Column() {
                TextField(
                    value = StateVars.text,
                    onValueChange = {
                        StateVars.text = it
                        viewModel.updateTodoText(StateVars.cardId, it)
                    }
                )
                Text("Bought")
                Checkbox(checked = StateVars.checkBoxState,
                    onCheckedChange = {
                        StateVars.checkBoxState = it
                        viewModel.updateTodoState(StateVars.cardId, it)
                    }
                )
            }
        },
        buttons = {
            Row(
                modifier = Modifier.padding(all = 8.dp),
                horizontalArrangement = Arrangement.Center
            ) {
                Button(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        StateVars.openDialog = false
                        StateVars.text = ""
                        StateVars.checkBoxState = false
                        StateVars.editingMode = false

                    }
                ) {
                    Text("Edit shopping item")
                }
            }
        }
    )
}

@Composable
private fun AddNewDialog(viewModel: ToDoViewModel) {
    AlertDialog(
        onDismissRequest = {
            StateVars.openDialog = false
            StateVars.cardId = -1
            StateVars.editingMode = false
        },
        title = {
            Text(text = "Item name and amount")
        },
        text = {
            Column() {
                TextField(
                    value = StateVars.text,
                    onValueChange = { StateVars.text = it }
                )
                Text("Bought")
                Checkbox(checked = StateVars.checkBoxState,
                    onCheckedChange = { StateVars.checkBoxState = it }
                )
            }
        },
        buttons = {
            Row(
                modifier = Modifier.padding(all = 8.dp),
                horizontalArrangement = Arrangement.Center
            ) {
                Button(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        viewModel.addTodo(StateVars.text, StateVars.checkBoxState)
                        StateVars.openDialog = false
                        StateVars.text = ""
                        StateVars.checkBoxState = false
                        StateVars.editingMode = false
                    }
                ) {
                    Text("Add shopping item")
                }
            }
        }
    )
}
