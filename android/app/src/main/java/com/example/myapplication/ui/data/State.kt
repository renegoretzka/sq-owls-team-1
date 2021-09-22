package com.example.myapplication.ui.data

import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.text.input.TextFieldValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.myapplication.ui.viewModel.ToDoViewModel

object StateVars {
    var cardId by mutableStateOf(-1)
    var openDialog by mutableStateOf(false)
    var checkBoxState by mutableStateOf(false)
    var text by mutableStateOf("")
    var editingMode by mutableStateOf(false)
    var textState by mutableStateOf(TextFieldValue(""))
    var checkedState by  mutableStateOf(false)

}


