import './App.css'
import { useEffect,useState } from "react";

function App() {
  const [product, setProducts] = useState([]);  
  const fetchproducts =async () => {
    const res = await fetch('https://dummyjson.com/products?limit=1');
    const data =await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  }
  useEffect(() => {
    fetchproducts();
  }, []);
  return (<div className="App">
    {
      product.length > 0 && <div className='products'>
        {
          product.map((prod) => {
            return <span>{ prod.title}</span>
          })
        }
      </div>
    }
  </div>
  )
}

export default App
