import { Badge, Drawer, Grid } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress'
import React, { useState } from 'react'
import { Item } from './item/Item'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Wrapper } from './App.style'
import { Cart } from './Cart/Cart'
import { useQuery } from 'react-query'

export type ProductType = {
  category: string
  description: string
  id: number
  image: string
  price: number
  title: string
  amount: number

}

const fetchProductsList = async (): Promise<ProductType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [openCart, setOpenCart] = useState(false)
  const [cartItems, setCartItems] = useState<ProductType[]>([])
  const { data, isLoading, error } = useQuery<ProductType[]>(
    'products',
    fetchProductsList
  )

  const addProduct = (item: ProductType) => {
    let newCartItems
    const product = cartItems.find((product) => product.id === item.id)

    if (!product) newCartItems = [...cartItems, { ...item, amount: 1 }]
    else {
      newCartItems = cartItems.map((cartItem) => (cartItem.id === product?.id)
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem)
    }

    setCartItems(newCartItems)
  }

  const deleteProduct = (item: ProductType) => {
    let newCartItems
    const product = cartItems.find((product) => product.id === item.id)

    if (product?.amount === 1) {
      newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
    }
    else {
      newCartItems = cartItems.map((cartItem) => (cartItem.id === product?.id)
        ? { ...cartItem, amount: cartItem.amount - 1 }
        : cartItem)
    }
    setCartItems(newCartItems)
  }

  const setTotalCartItems = cartItems.reduce((a, c) => a + c.amount, 0)

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={openCart} onClose={() => setOpenCart(false)}>
        <div onClick={() => setOpenCart(false)} className='btn-return'>
          <ArrowBackIcon fontSize='large' />
        </div>
        <Cart products={cartItems} deleteProduct={deleteProduct} addProduct={addProduct} />
      </Drawer>
      <div onClick={() => setOpenCart(true)} className='shopIcon'>
        <Badge badgeContent={setTotalCartItems} color='error' >
          <AddShoppingCartIcon />
        </Badge>
      </div>
      <Grid container spacing={3}>
        {data?.map((product: ProductType) => {
          return <Grid item key={product.id} xs={12} sm={6} md={4} xl={3}>
            <Item key={product.id} product={product} addProduct={addProduct} />
          </Grid>
        })}
      </Grid>
    </Wrapper >
  );
}

export default App;
