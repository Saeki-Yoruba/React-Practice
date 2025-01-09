import React from "react";
import CartItem from "./CartItem";
import './CartItem.css'

const CartList = ({ products, updateProduct, deleteProduct }) => {

    return (
        <ul className="list-group">
            {/* 標題行 */}
            <li className="cart-header list-group-item d-flex justify-content-between align-items-center">
                <div className="cart-header-details">
                    <span className="cart-header-id">ID</span>
                    <span className="cart-header-text">商品名稱</span>
                    <span className="cart-header-price">商品價格</span>
                </div>
                <span className="cart-header-action">刪除按鈕</span>
            </li>
            {
                products.map((product) => {
                    return <CartItem key={product.id}
                        product={product}
                        updateProduct={updateProduct}
                        deleteProduct={deleteProduct}
                    />
                })
            }
        </ul>

    )

}

export default CartList;