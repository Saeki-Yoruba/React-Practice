import React from "react";

const InputProduct = ({ myText, onTextChange, myPrice, onPriceChange, onAdd }) => {
    return (
        <div className="input-group mb-3">
            {/* 商品名稱輸入框 */}
            <input className="form-control"
                type=" text"
                placeholder="商品名稱"
                value={myText}
                onChange={onTextChange} />
            {/* 商品價格輸入框 */}
            <input className="form-control"
                type=" number"
                placeholder="商品價格"
                value={myPrice}
                onChange={onPriceChange} />
            {/* 新增按鈕 */}
            <button className="btn btn-primary" onClick={onAdd}>Add</button>
        </div>
    )
}

export default InputProduct;