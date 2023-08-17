import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import {Root, ErrorBoundary, Homepage, CategoryPage, CataloguePage, ProductPage, CartPage,CheckoutPage,ConfirmationPage} from './pages/AllPages'
import CartContextProvider from './context/CartContext'
const App = () => {

  const router = createBrowserRouter(


createRoutesFromElements(
<Route path='/' element={<Root/>} ErrorBoundary={ErrorBoundary}>

<Route index element ={<Homepage/>}/>
<Route path='category/:id' element ={<CategoryPage/>}/>
<Route path='product/:id' element ={<ProductPage/>}/>
<Route path='catalogue' element ={<CataloguePage/>}/>
<Route path='cart' element ={<CartPage/>}/>
<Route path='checkout' element ={<CheckoutPage/>}/>
<Route path='confirmation' element ={<ConfirmationPage/>}/>



</Route>

)

  )

  return (

    <CartContextProvider>

<RouterProvider router={router}/>

    </CartContextProvider>
   
  )
}

export default App