package com.example.myapplication.ui

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
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
import com.example.myapplication.ui.data.StateVars.amountState
import com.example.myapplication.ui.data.StateVars.textState
import com.example.myapplication.ui.data.Todo
import com.example.myapplication.ui.viewModel.ShoppingViewModel


@Composable
fun ShoppingScreen() {

    val viewModel: ShoppingViewModel = viewModel()
    val shoppingList = viewModel.shoppingState

    if(StateVars.cardId != -1) {
        StateVars.checkBox = shoppingList[StateVars.cardId].state
        StateVars.text= shoppingList[StateVars.cardId].text
        StateVars.openDialog = true
        StateVars.amount = shoppingList[StateVars.cardId].amount
    }else{
        StateVars.checkBox = false
        StateVars.text= ""
        StateVars.openDialog = false
        StateVars.amount = ""
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
            ShoppingListSection(shoppingList, viewModel)
        })
}

@OptIn(ExperimentalMaterialApi::class)
@Composable
private fun ShoppingListSection(
    todoList: SnapshotStateList<Todo>,
    viewModel: ShoppingViewModel
) {
//    Column(
//        modifier = Modifier
//            .background(Color.White)
//            .verticalScroll(rememberScrollState())
//            .padding(start = 45.dp),
//        horizontalAlignment = Alignment.CenterHorizontally
//    ) {
//        for ((index, toDo) in todoList.withIndex()) {
//            ShoppingRow(index, viewModel, toDo)
//        }
        LazyColumn(modifier = Modifier.fillMaxSize()){
            itemsIndexed(todoList){index, toDo ->
                    ShoppingRow(index = index, viewModel = viewModel , toDo = toDo)

            }
        }
        if (StateVars.openDialog) {
            AddOrEditDialog(viewModel)
        }

}

@Composable
private fun ShoppingRow(
    index: Int,
    viewModel: ShoppingViewModel,
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
            StateVars.textState = TextFieldValue(viewModel.shoppingState[index].text)
            TextField(
                value = textState,
                onValueChange = {
                    textState = it
                    viewModel.updateShoppingText(index, it.text)
                },
                modifier = Modifier
                    .width(200.dp)
                    .height(60.dp)
            )
            Spacer(modifier = Modifier.width(16.dp))
            StateVars.amountState = TextFieldValue(viewModel.shoppingState[index].amount)
            TextField(value = amountState, onValueChange ={
                amountState = it
                viewModel.updateShoppingAmount(index,it.text)
            },modifier = Modifier
                .width(50.dp)
                .height(60.dp))


             StateVars.checkedState = toDo.state
            Checkbox(
                checked = StateVars.checkedState,
                onCheckedChange = {
                    StateVars.checkedState = it
                    viewModel.updateShoppingStatus(index, it)
                    print("Updated State: " + viewModel.shoppingState[index].state)
                }
            )
        }

    }
}

@Composable
private fun AddOrEditDialog(viewModel: ShoppingViewModel) {
    if(StateVars.editingMode == false){
        AddNewDialog(viewModel)
    }else{
        EditDialog(viewModel)
    }
}




@Composable
private fun EditDialog(viewModel: ShoppingViewModel) {
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
                        viewModel.updateShoppingText(StateVars.cardId, it)
                    }
                )

                TextField(
                    value = StateVars.amount,
                    onValueChange = {
                        StateVars.amount = it
                        viewModel.updateShoppingAmount(StateVars.cardId, it)
                    }
                )
                Text("Bought")
                Checkbox(checked = StateVars.checkBox,
                    onCheckedChange = {
                        StateVars.checkBox = it
                        viewModel.updateShoppingStatus(StateVars.cardId, it)
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
                        StateVars.checkBox = false
                        StateVars.editingMode = false
                        StateVars.cardId = -1
                        StateVars.amount = " "

                    }
                ) {
                    Text("Edit shopping item")
                }
            }
        }
    )
}

@Composable
private fun AddNewDialog(viewModel: ShoppingViewModel) {
    AlertDialog(
        onDismissRequest = {
            StateVars.openDialog = false
            StateVars.cardId = -1
            StateVars.editingMode = false
            StateVars.openDialog = false
            StateVars.text = ""
            StateVars.checkBox = false
            StateVars.editingMode = false
            StateVars.amount = ""
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

                TextField(
                    value = StateVars.amount,
                    onValueChange = {
                        StateVars.amount = it }
                )
                Text("Bought")
                Checkbox(checked = StateVars.checkBox,
                    onCheckedChange = { StateVars.checkBox = it }
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
                        viewModel.addShopping(StateVars.text, StateVars.checkBox, StateVars.amount)
                        StateVars.openDialog = false
                        StateVars.text = ""
                        StateVars.checkBox = false
                        StateVars.editingMode = false
                        StateVars.amount= ""
                    }
                ) {
                    Text("Add shopping item")
                }
            }
        }
    )
}
