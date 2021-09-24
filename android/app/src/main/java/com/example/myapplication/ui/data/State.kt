package com.example.myapplication.ui.data

import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.text.input.TextFieldValue

object StateVars {
    var cardId by mutableStateOf(-1)
    var openDialog by mutableStateOf(false)
    var checkBox by mutableStateOf(false)
    var text by mutableStateOf("")
    var editingMode by mutableStateOf(false)
    var textState by mutableStateOf(TextFieldValue(""))
    var checkedState by  mutableStateOf(false)
    var registration by mutableStateOf(true)
    var confirmationCodeTextFieldExpanded by mutableStateOf(true)
    var amount by mutableStateOf("")
    var amountState by mutableStateOf(TextFieldValue(""))
}


