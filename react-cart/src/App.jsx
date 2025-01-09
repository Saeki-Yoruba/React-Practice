import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputProduct from './components/InputProduct';
import CartList from './components/CartList';

/**
功能:
1. 新增商品:
✓ 使用者可以輸入商品名稱和價格,然後點擊按鈕將商品新增到購物車。
✓ 商品名稱和價格輸入框必須有初始值,且新增後會自動清空輸入框。
2. 顯示購物車內容:
✓ 顯示購物車內所有商品的名稱、價格。
✓ 顯示購物車的總金額。
3. 刪除商品:
✓ 每個商品旁邊有一個「刪除」按鈕,點擊後可以移除該商品。
#加分4. 進階功能:
△ 在購物車內點擊商品名稱時,允許使用者編輯該商品的名稱或價格。
要求:
1. 使用 React 和 useState。
2. UI 必須簡潔清楚。
3. 代碼分工:
✓ 商品輸入框與新增按鈕:可為一個組件。→InputProduct
✓ 購物車列表:顯示所有商品,為一個組件。→CartList
✓ 總金額:顯示總金額,可在主組件(App.jsx)內直接處理。→totalPrice
*/

function App() {

  const [products, setProducts] = useState([]);
  const [myText, setMyText] = useState("商品名稱");
  const [myPrice, setMyPrice] = useState("商品價格");

  // 處理產品輸入
  const onTextChange = (e) => {
    setMyText(e.target.value);
  };
  const onPriceChange = (e) => {
    setMyPrice(e.target.value);
  };

  // 新增物品
  const onAdd = (e) => {
    const id = products.length > 0 ? Math.max(...products.map((t) => t.id)) + 1 : 1;
    const text = myText;
    const price = parseFloat(myPrice || 0);

    const product = {
      id: id,
      text: text,
      price: price
    }

    setProducts([...products, product]);
    console.log(product);
    // 清空輸入框
    setMyText('');
    setMyPrice('');
  }

  // 修改商品
  const updateProduct = (id, newText, newPrice) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, text: newText, price: newPrice } : product
      )
    );
  };

  // 刪除商品
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id)
    );
  };

  // 計算價格
  const totalPrice = products.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);

  return (
    <div className='container mt-5'>
      {console.log('display ui')}
      <h1 className='text-center'>我的簡易購物車</h1>
      <InputProduct
        myText={myText} onTextChange={onTextChange}
        myPrice={myPrice} onPriceChange={onPriceChange}
        onAdd={onAdd} />
      <CartList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
      <div className='mt-4'>
        總金額: ${totalPrice.toFixed(2)}
      </div>
    </div>
  )
}
export default App