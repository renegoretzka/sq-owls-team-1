package com.example.myapplication.ui

import androidx.compose.foundation.background
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.myapplication.ui.viewModel.ToDoViewModel


@Composable
fun ToDoScreen() {
    val openDialog = remember { mutableStateOf(false) }
    val viewModel: ToDoViewModel = viewModel()
    val todoList = viewModel.toDoState
    val checkBoxState = remember { mutableStateOf(false) }

    Scaffold(topBar = {},
        floatingActionButton = {
            ExtendedFloatingActionButton(
                icon = { Icon(Icons.Filled.Add, "") },
                text = { Text("Add")},
                onClick = { openDialog.value = true },
                elevation = FloatingActionButtonDefaults.elevation(8.dp)
            )
        },

        content = {
            Column(
                modifier = Modifier
                    .background(Color.White)
                    .verticalScroll(rememberScrollState())
                    .padding(start = 45.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                for ((index,toDo) in todoList.withIndex()) {
                    Card(
                        backgroundColor = Color.White,
                        modifier = Modifier.padding(6.dp)
                    ) {

                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center
                        ) {
                            val textState = remember { mutableStateOf(TextFieldValue(viewModel.toDoState[index].text)) }
                            TextField(
                                value = textState.value,
                                onValueChange = {
                                    textState.value = it
                                    viewModel.updateTodoText(index,it.text)
                                    print("Updated Text: "+ viewModel.toDoState[index].text)
                                }
                            )
                            val checkedState = remember { mutableStateOf(toDo.state) }
                            Checkbox(
                                checked = checkedState.value,
                                onCheckedChange = { checkedState.value = it
                                    viewModel.updateTodoState(index,it)
                                    print("Updated State: "+ viewModel.toDoState[index].state)
                                }
                            )
                        }


                    }
                }
                var text by remember { mutableStateOf("") }
                if (openDialog.value) {
                    AlertDialog(
                        onDismissRequest = {
                            openDialog.value = false
                        },
                        title = {
                            Text(text = "Item name amd amount")
                        },
                        text = {
                            Column() {
                                TextField(
                                    value = text,
                                    onValueChange = { text = it }
                                )
                                Text("Bought")
                                Checkbox(checked = checkBoxState.value,
                                    onCheckedChange = { checkBoxState.value = it }
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
                                        viewModel.addTodo(text, checkBoxState.value)
                                        openDialog.value = false
                                        text = ""
                                        checkBoxState.value = false
                                    }
                                ) {
                                    Text("Add shopping item")
                                }
                            }
                        }
                    )
                }
            }
        })
}

//@Composable
//fun CheckBoxElement(stateOfAddedItem:Boolean) {
//
//}
//@Composable
//private fun ShoppingRow() {
//    Card(
//        backgroundColor = Color.White,
//        modifier = Modifier.padding(6.dp)
//    ) {
//        val openDialog = remember { mutableStateOf(false) }
//        Row(
//            verticalAlignment = Alignment.CenterVertically,
//            horizontalArrangement = Arrangement.Center
//        ) {
//            val textState = remember { mutableStateOf(TextFieldValue("")) }
//            TextField(
//                value = textState.value,
//                onValueChange = {
//                    textState.value = it
//                    //viewModel.updateField(field, textState.value.text)
//                }
//            )
//            CheckBoxElement()
//        }
//        var text by remember { mutableStateOf("") }
//
//        if (openDialog.value) {
//            AlertDialog(
//                onDismissRequest = {
//                    openDialog.value = false
//                },
//                title = {
//                    Text(text = "Title")
//                },
//                text = {
//                    Column() {
//                        TextField(
//                            value = text,
//                            onValueChange = { text = it }
//                        )
//                        Text("Custom Text")
//                        Checkbox(checked = false, onCheckedChange = {})
//                    }
//                },
//                buttons = {
//                    Row(
//                        modifier = Modifier.padding(all = 8.dp),
//                        horizontalArrangement = Arrangement.Center
//                    ) {
//                        Button(
//                            modifier = Modifier.fillMaxWidth(),
//                            onClick = { openDialog.value = false }
//                        ) {
//                            Text("Dismiss")
//                        }
//                    }
//                }
//            )
//        }
//
//    }
//}



//@Composable
//fun ExtendedFloatingActionButtonElement() {
//    ExtendedFloatingActionButton(
//        icon = { Icon(Icons.Filled.Add, "") },
//        text = { Text("Add") },
//        onClick = { },
//        elevation = FloatingActionButtonDefaults.elevation(8.dp)
//    )
//}
//
//@Composable
//fun CustomDialog(openDialog: Boolean) {
//
//}