package com.example.myapplication

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.amplifyframework.AmplifyException
import com.amplifyframework.api.aws.AWSApiPlugin
import com.amplifyframework.auth.AuthSession
import com.amplifyframework.auth.cognito.AWSCognitoAuthPlugin
import com.amplifyframework.core.Amplify
import com.example.myapplication.ui.RegistrationScreen
import com.example.myapplication.ui.ShoppingScreen
import com.example.myapplication.ui.theme.MyApplicationTheme


class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
            // Add this line, to include the Auth plugin.
            // Add these lines to add the AWSApiPlugin plugins

            // Add these lines to add the AWSApiPlugin plugins
            Amplify.addPlugin(AWSApiPlugin())
            Amplify.addPlugin(AWSCognitoAuthPlugin())
            Amplify.configure(applicationContext)
            Log.i("MyAmplifyApp", "Initialized Amplify")
        } catch (error: AmplifyException) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
        }


        setContent {
            Amplify.Auth.fetchAuthSession(
                { result: AuthSession ->
                    Log.i(
                        "AmplifyQuickstart",
                        result.toString()
                    )
                }
            ) { error: com.amplifyframework.auth.AuthException ->
                Log.e(
                    "AmplifyQuickstart",
                    error.toString()
                )
            }
            MyApplicationTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    UserApplication()
                }
            }
        }
    }
}

@Composable
fun UserApplication(){
    val navController = rememberNavController()
    NavHost(navController =navController , startDestination ="registration"){
        composable("registration"){
            RegistrationScreen(navHostController = navController)
        }

        composable("item_list"){
            ShoppingScreen()
        }

    }
    
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MyApplicationTheme {
        Greeting("Android")
    }
}