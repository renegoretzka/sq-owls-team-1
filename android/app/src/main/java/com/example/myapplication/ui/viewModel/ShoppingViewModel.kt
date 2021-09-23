package com.example.myapplication.ui.viewModel

import android.util.Log
import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.amplifyframework.api.aws.GsonVariablesSerializer
import com.amplifyframework.api.graphql.GraphQLRequest
import com.amplifyframework.api.graphql.PaginatedResult
import com.amplifyframework.api.graphql.SimpleGraphQLRequest
import com.amplifyframework.api.graphql.model.ModelQuery
import com.amplifyframework.auth.AuthException
import com.amplifyframework.auth.AuthUserAttribute
import com.amplifyframework.core.Amplify
import com.amplifyframework.datastore.generated.model.Item
import com.amplifyframework.datastore.generated.model.User
import com.example.myapplication.ui.data.Todo
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.*


class ShoppingViewModel() : ViewModel() {
    val shoppingState = mutableStateListOf<Todo>()
    var userId = "76dfd72c-7718-4aff-9940-1c5046d592ab"

    init {
        val handler = CoroutineExceptionHandler { _, exception ->
            Log.d("EXCEPTION", "Thread exception")
        }

        viewModelScope.launch(handler + Dispatchers.IO) {
            Amplify.Auth.fetchUserAttributes(
                { attributes: List<AuthUserAttribute?> ->
                    Log.i(
                        "AuthDemo",
                        "User attributes = ${attributes.get(0)}"
                    )
                }
            ) { error: AuthException? ->
                Log.e(
                    "AuthDemo",
                    "Failed to fetch user attributes.",
                    error
                )
            }


            Amplify.API.query(getUserRequest(userId),
                { Log.d("MyAmplifyApp", "Response = $it") },
                { Log.e("MyAmplifyApp", "Error!", it) })
        }

    }

    private fun getUserRequest(id: String): GraphQLRequest<Any> {
        val document = ("query GetUser ($id: ID!) {\n" +
                "  getUser(id: $id) {\n" +
                "    id\n" +
                "    name\n" +
                "    memberships {\n" +
                "      items {\n" +
                "        list {\n" +
                "          id\n" +
                "          name\n" +
                "          users {\n" +
                "            items {\n" +
                "              user {\n" +
                "                id\n" +
                "                name\n" +
                "              }\n" +
                "            }\n" +
                "          }\n" +
                "          items {\n" +
                "            items {\n" +
                "              id\n" +
                "              name\n" +
                "              quantity\n" +
                "              updatedAt\n" +
                "            }\n" +
                "          }\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}")
        return SimpleGraphQLRequest(
            document,
            Collections.singletonMap<String, Any>("id", id),
            User::class.java,
            GsonVariablesSerializer()
        )
    }


    fun addShopping(text: String, state: Boolean, amount: String) {
        shoppingState.add(Todo(text, state, amount))


    }

    fun removeShopping(toDo: Todo) {
        shoppingState.remove(toDo)
    }


    fun updateShoppingText(index: Int, text: String) {
        shoppingState.get(index).text = text
    }

    fun updateShoppingAmount(index: Int, amount: String) {
        shoppingState.get(index).amount = amount
    }

    fun updateShoppingStatus(index: Int, state: Boolean) {
        shoppingState.get(index).state = state
    }

    private fun getShopping(id: String) {
        Amplify.API.query(
            ModelQuery.get(Item::class.java, id),
            { Log.i("MyAmplifyApp", "Query results = ${(it.data as Item).name}") },
            { Log.e("MyAmplifyApp", "Query failed", it) }
        )
    }

//    private fun queryItems(){
//        try {
//            Amplify.API
//                .query(ModelQuery.list(Item::class.java),{},{})
//                .items.forEach { todo -> Log.i("MyAmplifyApp", todo.name) }
//        } catch (error: ApiException) {
//            Log.e("MyAmplifyApp", "Query failure", error)
//        }
//    }


    fun queryPage(request: GraphQLRequest<PaginatedResult<Item>>) {

    }
}