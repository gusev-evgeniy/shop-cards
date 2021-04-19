import React from 'react'
import { Wrapper } from './item.style'
import { ProductType } from '../App'
import Button from '@material-ui/core/Button/Button'

type PropsType = {
  product: ProductType
  addProduct: (product: ProductType) => void
}

export const Item: React.FC<PropsType> = ({ product, addProduct }) => {
  return (
    <Wrapper>
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </div>
      <Button onClick={() => addProduct(product)}> Add to cart</Button>
    </Wrapper>
  )
}
