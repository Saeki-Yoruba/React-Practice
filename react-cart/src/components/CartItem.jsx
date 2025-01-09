import React from "react";
import './CartItem.css'

const CartItem = ({ product, updateProduct, deleteProduct }) => {
    const handleFieldChange = (field, e) => {
        const value = field === "price" ? parseFloat(e.target.textContent) || 0 : e.target.textContent;
        updateProduct(
            product.id,
            field === "text" ? value : product.text,
            field === "price" ? value : product.price);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="cart-item-details">
                <span className="cart-item-id">{product.id}</span>{" "}
                <span
                    className="cart-item-text"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFieldChange("text", e)}
                >
                    {product.text}
                </span>{" "}

                <span
                    className="cart-item-price"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFieldChange("price", e)}
                >
                    {product.price}
                </span>
            </div>
            <button type="button"
                className="btn btn-danger"
                onClick={() => deleteProduct(product.id)}>刪除商品</button>
        </li>
    );
};

export default CartItem;