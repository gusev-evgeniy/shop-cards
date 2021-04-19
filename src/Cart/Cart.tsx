import React from 'react'
import { ProductType } from '../App'
import { Wrapper } from './Cart.style'
import { CartItem } from './CartItem/CartItem'

type PropsType = {
  products: ProductType[]
  deleteProduct: (products: ProductType) => void
  addProduct: (products: ProductType) => void
}

export const Cart: React.FC<PropsType> = ({ products, deleteProduct, addProduct }) => {

  const calculateTotalPrice = () => {
    return products.reduce((a, c) => a + c.price * c.amount, 0)
  }
  return (
    <Wrapper>
      {products.length === 0 && <h4>No items in cart</h4>}
      {products.length !== 0 && products.map((product) => (
        <CartItem key={product.id} product={product} deleteProduct={deleteProduct} addProduct={addProduct} />
      ))}
      <h2>Total: ${calculateTotalPrice()}</h2>
    </Wrapper>
  )
}
