package com.example.myapplication.ui

import android.util.Log
import android.util.Log.i
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import com.amplifyframework.auth.AuthException
import com.amplifyframework.auth.AuthUserAttributeKey
import com.amplifyframework.auth.options.AuthSignUpOptions
import com.amplifyframework.auth.result.AuthSignUpResult
import com.amplifyframework.core.Amplify


@Composable
fun RegistrationScreen() {
    var confirmationCodeTextField = remember { mutableStateOf(TextFieldValue("")) }
    var phoneNumberTextField = remember { mutableStateOf(TextFieldValue("")) }
    var passwordTextField = remember { mutableStateOf(TextFieldValue("")) }
    Column() {

        TextField(
            value = phoneNumberTextField.value,
            onValueChange = {
                phoneNumberTextField.value = it
            }
        )
        Spacer(modifier = Modifier.padding(5.dp))
        TextField(
            value = passwordTextField.value,
            onValueChange = {
                passwordTextField.value = it
            }
        )
        Spacer(modifier = Modifier.padding(5.dp))
        Button(onClick = {
            if(confirmationCodeTextField.value.text == "") {
                registerUser(
                    phoneNumber = phoneNumberTextField.value.text,
                    userName = phoneNumberTextField.value.text,
                    password = passwordTextField.value.text
                )
            }else{
                confirmRegistration(phoneNumber = phoneNumberTextField.value.text,
                confirmationCode = confirmationCodeTextField.value.text)
            }

        }) {
            Text(text = "Registration")
        }
        Spacer(modifier = Modifier.padding(15.dp))
         Text(text = "Enter confirmation code after you receive it via SMS")
        Spacer(modifier = Modifier.padding(5.dp))
        TextField(
            value = confirmationCodeTextField.value,
            onValueChange = {
                confirmationCodeTextField.value = it
            }
        )
    }
}

fun registerUser(phoneNumber: String, userName: String, password: String) {

    val options = AuthSignUpOptions.builder()
        .userAttribute(AuthUserAttributeKey.phoneNumber(), phoneNumber)
        .build()
    Amplify.Auth.signUp(userName, password, options,
        { result: AuthSignUpResult ->
            i(
                "AuthQuickStart",
                "Result: $result"
            )
        }
    ) { error: AuthException? ->
        Log.e(
            "AuthQuickStart",
            "Sign up failed",
            error
        )
    }

}

private fun confirmRegistration(phoneNumber:String,confirmationCode: String ) {
    Amplify.Auth.confirmSignUp(
        phoneNumber,
        confirmationCode,
        { result: AuthSignUpResult ->
            i(
                "AuthQuickstart",
                if (result.isSignUpComplete) "Confirm signUp succeeded" else "Confirm sign up not complete"
            )
        }
    ) { error: AuthException ->
        Log.e(
            "AuthQuickstart",
            error.toString()
        )
    }
}

