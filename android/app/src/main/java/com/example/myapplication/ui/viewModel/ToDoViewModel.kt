package com.example.myapplication.ui.viewModel

import android.util.Log
import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.ViewModel
import com.amplifyframework.api.ApiException
import com.amplifyframework.api.graphql.GraphQLRequest
import com.amplifyframework.api.graphql.GraphQLResponse
import com.amplifyframework.api.graphql.PaginatedResult
import com.amplifyframework.api.graphql.model.ModelPagination
import com.amplifyframework.api.graphql.model.ModelQuery
import com.amplifyframework.core.Amplify
import com.amplifyframework.core.Consumer
import com.amplifyframework.datastore.generated.model.Item
import com.example.myapplication.ui.data.Todo





class ToDoViewModel(): ViewModel() {

    val shoppingState = mutableStateListOf<Todo>()

    fun addTodo(text: String, state: Boolean){
        shoppingState.add(Todo(text=text,state = state))

    }

    fun updateTodoText(index:Int, text:String){
        shoppingState.get(index).text=text
    }

    fun updateTodoState(index:Int, state: Boolean){
        shoppingState.get(index).state=state
    }

    private fun getTodo(id: String) {
        Amplify.API.query(
            ModelQuery.get(Item::class.java, id),
            { Log.i("MyAmplifyApp", "Query results = ${(it.data as Item).name}") },
            { Log.e("MyAmplifyApp", "Query failed", it) }
        )
    }

    private fun queryItems(){
        query(ModelQuery.list(Item::class.java, ModelPagination.limit(1_000)))
    }


    fun query(request: GraphQLRequest<PaginatedResult<Item>>) {
        Amplify.API.query(request,
            { response ->
                if (response.hasData()) {
                    response.data.items.forEach { item ->
                        Log.d("MyAmplifyApp", item.name)
                    }
                    if (response.data.hasNextResult()) {
                        query(response.data.requestForNextResult)
                    }
                }
            },
            { Log.e("MyAmplifyApp", "Query failed", it) }
        )
    }
}