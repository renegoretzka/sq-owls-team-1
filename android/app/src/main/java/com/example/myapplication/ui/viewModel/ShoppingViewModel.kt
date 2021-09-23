package com.example.myapplication.ui.viewModel

import android.util.Log
import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.ViewModel
import com.amplifyframework.api.ApiException
import com.amplifyframework.api.graphql.GraphQLRequest
import com.amplifyframework.api.graphql.GraphQLResponse
import com.amplifyframework.api.graphql.PaginatedResult
import com.amplifyframework.api.graphql.model.ModelMutation
import com.amplifyframework.api.graphql.model.ModelQuery
import com.amplifyframework.core.Amplify
import com.amplifyframework.core.Consumer
import com.amplifyframework.datastore.generated.model.Item
import com.amplifyframework.datastore.generated.model.ItemStatus
import com.example.myapplication.ui.data.Todo


class ShoppingViewModel(): ViewModel() {
    val shoppingState = mutableStateListOf<Todo>()

    fun addShopping(text: String, state: Boolean, amount: String){
        shoppingState.add(Todo(text,state,amount))

//        val item = Item.builder().name(text).status(ItemStatus.ACTIVE).listId("id").build()
//        try {
//            val response = Amplify.API.mutate(ModelMutation.create(item),{ Log.i("MyAmplifyApp", "Added Todo with id:")},{Log.e("MyAmplifyApp", "Create failed")})
//
//        } catch (error: ApiException) {
//            Log.i("MyAmplifyApp", "Exception")
//        }



    }

    fun updateShoppingText(index:Int, text:String){
        shoppingState.get(index).text=text
    }

    fun updateShoppingAmount(index:Int, amount:String){
        shoppingState.get(index).amount=amount
    }

    fun updateShoppingStatus(index:Int, state: Boolean){
        shoppingState.get(index).state=state
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