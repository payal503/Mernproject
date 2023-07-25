import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api";
import { toast } from "react-toastify";
 
export const fetchCart=createAsyncThunk("fetch cart",async(customerId)=>{
    let response=await axios.post(api.VIEW_CART_ITEMS,{customerId})
    return response.data[0].cartItems
    
})

export const addItemIntoCart=createAsyncThunk("cart/addItemcart",async(obj)=>{
    const response=await axios.post(api.ADD_TO_CART,{customerId:obj.customerId,productId:obj.productId})
    console.log(obj)
    if(response.data.status){
        console.log(response)
    return response.data
    }
})
const slice=createSlice({
    name:"cart",
    initialState:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[],
        cartTotalQauntity:0,
        cartTotalAmount:0,
        cartError:null,
        flag:false
    },
    reducers:{
         setCartItem:(state,action)=>{
        state.cartItems=action.payload
         },
        updateCartItems:(state,action)=>{
        const itemIndex=state.cartItems.findIndex((item)=>item.productId._id===action.payload._id)
        if(itemIndex>=0){
            state.cartItems[itemIndex].quantity=state.cartItems[itemIndex].quantity+1
            toast.success(`${action.payload.title} is added to the cart!`)
            
        }
        else{
            state.cartItems=[...state.cartItems,{productId:action.payload,quantity:1}] 
            toast.success(`${action.payload.title} is added to the cart!`)
        }
        localStorage.setItem("cartItem",JSON.stringify(state.cartItems))

       },
       removeCartItem(state,action){
        const inCartItem=state.cartItems.filter(cartItems=>cartItems.productId._id!==action.payload.productId._id)
        state.cartItems=inCartItem
        localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
        toast.error(`item is removed from the cart`)
       },
       decreaseCartQuantity(state,action){
        const itemIndex=state.cartItems.findIndex(
            cartItems=>cartItems.productId._id===action.payload.productId._id
        )
        if(state.cartItems[itemIndex].quantity>1){
            state.cartItems[itemIndex].quantity-=1
        }
        else if(state.cartItems[itemIndex].quantity === 1){
            const inCartItems =  state.cartItems.filter(
                cartItem => cartItem.productId._id!==action.payload.productId._id
            )
            state.cartItems=inCartItems;
            console.log(action.payload+"sdkjnfsknfmsn")
            toast.error(`item is removed from the cart!`)
       }
       localStorage.setItem("cartitems",JSON.stringify(state.cartItems))  
    },
    incareaseCartQuantity(state,action){
        const itemIndex= state.cartItems.findIndex(
            cartItem => cartItem.productId._id === action.payload.productId._id
        )      
            state.cartItems[itemIndex].quantity+= 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))            
    },
    clearAllCart(state) {
        state.cartItems = [];
        toast.error(`The cart is cleared!`)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

    },
    getTotal(state) {

        let {total,quantities} = state.cartItems.reduce((cartTotal, cartItem)=>{
          
            const {price,quantity} = {price:cartItem.productId.price,quantity:cartItem.quantity}
            const itemTotal = price * quantity;
            cartTotal.total += itemTotal;
            cartTotal.quantities += quantity
        
            return cartTotal;
        }, {
            total:0,
            quantity:0,
        });

        state.totalQuantity = quantities;
        state.totalAmount = total;
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.fulfilled,(state,action)=>{
            state.cartItems=action.payload
        }).addCase(fetchCart.rejected,(state,action)=>{
            state.cartError="Something went wrong"
        }).addCase(addItemIntoCart.fulfilled,(state,action)=>{
            state.flag=true;
        }).addCase(addItemIntoCart.rejected,(state,action)=>{
            state.cartError="Opp! Something went Wrong"
        })
    }
}

})

export const {updateCartItems,removeCartItem,decreaseCartQuantity,incareaseCartQuantity,clearAllCart,getTotal}=slice.actions;
export default slice.reducer;