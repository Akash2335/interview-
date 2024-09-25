import '../../app.css'
import { useEffect, useState } from "react";

function ProductPagination() {
  const [product, setProducts] = useState([]);  
  const [page, setPage] = useState(1);
  
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const selectedPages = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(product.length / 10) && selectedPage !== page) {
      setPage(selectedPage);
    } 
  }

  return (
    <div className="app">
      {
        product.length > 0 && (
          <div className='products'>
            {
              product.slice((page - 1) * 10, page * 10).map((prod) => {
                return (
                  <span className='product__single' key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title} />
                    <p>{prod.title}</p>
                  </span>
                )
              })
            }
          </div>
        )
      }
      {
        product.length > 0 && (
          <div className='pagination'>
            <span onClick={() => selectedPages(page - 1)} disabled={page === 1}>
              ⬅️
            </span>
            <span>
              {
                [...Array(Math.ceil(product.length / 10))].map((_, i) => {
                  return (
                    <span
                      key={i}
                      onClick={() => selectedPages(i + 1)}
                      className={page === i + 1 ? "pagination__selected" : "gray"}
                    >
                      {i + 1}
                    </span>
                  )
                })
              }
            </span>
            <span onClick={() => selectedPages(page + 1)} disabled={page === Math.ceil(product.length / 10)}>
              ➡️
            </span>
          </div>
        )
      }
    </div>
  );
}

export default ProductPagination;
