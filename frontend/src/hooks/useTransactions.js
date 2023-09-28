import { useState, useEffect } from 'react';

const url = 'http://localhost:3001/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    clientId: '',
    currency: '',
    paymentMethod: '',
    dataPayment: '',
    providerId: '',
    products: [],
  });

  const [isClientTransaction, setIsClientTransaction] = useState(true);

  const getTransactions = async () => {
    try {
      const response = await fetch(`${url}/transaction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setTransactions(() => [...dataResponse]);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  };

  // const addProduct = async () => {
  //   setLoading(true);

  //   const body = JSON.stringify({
  //     size: formValues.size,
  //     material: formValues.material,
  //     style: formValues.style,
  //     brand: formValues.brand,
  //     color: formValues.color,
  //     type: formValues.type,
  //     product: {
  //       name: formValues.name,
  //       price: formValues.price,
  //       quantity_in_stock: formValues.quantityInStock,
  //       buy_cost: formValues.buyCost,
  //       sell_cost: formValues.sellCost,
  //     },
  //   });

  //   try {
  //     const response = await fetch(`${url}/product/garment`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //       body,
  //     });
  //     const dataResponse = await response.json();
  //     throw new Error(dataResponse.message);
  //   } catch (error) {
  //     return {};
  //   } finally {
  //     getProducts();
  //     setLoading(false);
  //     setFormValues(() => ({
  //       size: '',
  //       material: '',
  //       style: '',
  //       brand: '',
  //       color: '',
  //       type: '',
  //       name: '',
  //       price: '',
  //       quantityInStock: '',
  //       buyCost: '',
  //       sellCost: '',
  //     }));
  //   }
  // };

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

  const handleSwitchChange = (e) => {
    setIsClientTransaction(e.target.checked);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return {
    transactions,
    loading,
    formValues,
    handleFormChange,
    isClientTransaction,
    handleSwitchChange,
    setFormValues
  };
};
