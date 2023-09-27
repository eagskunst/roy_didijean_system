import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    size: '',
    material: '',
    style: '',
    brand: '',
    color: '',
    type: '',
    name: '',
    price: '',
    quantityInStock: '',
    buyCost: '',
    sellCost: '',
  });

  const getProducts = async () => {
    try {
      const response = await fetch(`${url}/product/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setProducts(() => [...dataResponse.data]);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    setLoading(true);

    const body = JSON.stringify({
      size: formValues.size,
      material: formValues.material,
      style: formValues.style,
      brand: formValues.brand,
      color: formValues.color,
      type: formValues.type,
      product: {
        name: formValues.name,
        price: formValues.price,
        quantity_in_stock: formValues.quantityInStock,
        buy_cost: formValues.buyCost,
        sell_cost: formValues.sellCost,
      },
    });

    try {
      const response = await fetch(`${url}/product/garment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body,
      });
      const dataResponse = await response.json();
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getProducts();
      setLoading(false);
      setFormValues(() => ({
        size: '',
        material: '',
        style: '',
        brand: '',
        color: '',
        type: '',
        name: '',
        price: '',
        quantityInStock: '',
        buyCost: '',
        sellCost: '',
      }));
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // const deleteProvider = async (id) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${url}/provider/`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     const dataResponse = await response.json();
  //     throw new Error(dataResponse.message);
  //   } catch (error) {
  //     return {};
  //   } finally {
  //     getProducts();
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);


  return {
    products,
    loading,
    formValues,
    handleFormChange,
    addProduct,
  };
};
