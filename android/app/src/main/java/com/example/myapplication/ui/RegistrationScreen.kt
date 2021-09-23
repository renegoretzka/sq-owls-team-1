package com.example.myapplication.ui

import android.util.Log
import android.util.Log.i
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.amplifyframework.auth.AuthException
import com.amplifyframework.auth.AuthUserAttributeKey
import com.amplifyframework.auth.options.AuthSignUpOptions
import com.amplifyframework.auth.result.AuthSignInResult
import com.amplifyframework.auth.result.AuthSignUpResult
import com.amplifyframework.core.Amplify
import com.example.myapplication.ui.data.StateVars


@OptIn(ExperimentalAnimationApi::class)
@Composable
fun RegistrationScreen() {
    var confirmationCodeTextField = remember { mutableStateOf(TextFieldValue("")) }
    var phoneNumberTextField = remember { mutableStateOf(TextFieldValue("")) }
    var passwordTextField = remember { mutableStateOf(TextFieldValue("")) }
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(top = 150.dp)
    ) {
        Text(text = "Shopping List", fontSize = 30.sp)
        Spacer(modifier = Modifier.padding(25.dp))
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
        enterAppButton(confirmationCodeTextField, phoneNumberTextField, passwordTextField)
        Spacer(modifier = Modifier.padding(15.dp))
        AnimatedVisibility(visible = true) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
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
        Spacer(modifier = Modifier.padding(15.dp))
        if (StateVars.confirmationCodeTextFieldExpanded) {
            OutlinedButton(onClick = {
                StateVars.confirmationCodeTextFieldExpanded =
                    !StateVars.confirmationCodeTextFieldExpanded
            }) {
                Text(text = "Switch to log in")
            }
        } else {
            OutlinedButton(onClick = {
                StateVars.confirmationCodeTextFieldExpanded =
                    !StateVars.confirmationCodeTextFieldExpanded
            }) {
                Text(text = "Switch to registration")
            }
        }

    }

}

@Composable
private fun enterAppButton(
    confirmationCodeTextField: MutableState<TextFieldValue>,
    phoneNumberTextField: MutableState<TextFieldValue>,
    passwordTextField: MutableState<TextFieldValue>
) {

    if (StateVars.registration) {
        Button(onClick = {
            if (confirmationCodeTextField.value.text == "") {
                registerUser(
                    phoneNumber = phoneNumberTextField.value.text,
                    userName = phoneNumberTextField.value.text,
                    password = passwordTextField.value.text
                )
            } else {
                confirmRegistration(
                    phoneNumber = phoneNumberTextField.value.text,
                    confirmationCode = confirmationCodeTextField.value.text
                )
            }

        }) {
            Text(text = "Enter application")
        }
    } else {

        Button(onClick = {
            if (confirmationCodeTextField.value.text == "") {
                signIn(
                    userName = phoneNumberTextField.value.text,
                    password = passwordTextField.value.text
                )
            } else {
                confirmSignIn(confirmationCode = confirmationCodeTextField.value.text)
            }

        }) {
            Text(text = "Sign in")
        }


    }
}

private fun confirmSignIn(confirmationCode: String) {
    Amplify.Auth.confirmSignIn(confirmationCode,
        { i("AuthQuickstart", "Confirmed signin: $it") },
        { Log.e("AuthQuickstart", "Failed to confirm signin", it) }
    )
}


private fun signIn(
    userName: String,
    password: String
) {
    Amplify.Auth.signIn(
        userName,
        password,
        { result: AuthSignInResult ->
            i(
                "AuthQuickstart",
                if (result.isSignInComplete) "Sign in succeeded" else "Sign in not complete"
            )
        }
    ) { error: AuthException ->
        Log.e(
            "AuthQuickstart",
            error.toString()
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

private fun confirmRegistration(phoneNumber: String, confirmationCode: String) {
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


