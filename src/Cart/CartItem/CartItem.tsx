import { Button } from '@material-ui/core'
import React from 'react'
import { ProductType } from '../../App'
import { Wrapper } from './CartItem.style'


type PropsType = {
  product: ProductType
  deleteProduct: (products: ProductType) => void
  addProduct: (products: ProductType) => void
}

export const CartItem: React.FC<PropsType> = ({ product, deleteProduct, addProduct }) => {
  return (
    <Wrapper>
      <div>
        <h3>{product.title}</h3>
        <div className="information">
          <p>Prive: ${product.price}</p>
          <p>Total: ${product.price * product.amount}</p>
        </div>
        <div className="buttons">
          <Button size='small' disableElevation variant='contained' onClick={() => deleteProduct(product)}>
            -
          </Button>
          <p>{product.amount}</p>
          <Button size='small' disableElevation variant='contained' onClick={() => addProduct(product)}>
            +
          </Button>
        </div>
      </div>
      <img src={product.image} alt={product.title} />
    </Wrapper>
  )
}
