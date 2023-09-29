import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

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

  const [productToAdd, setProductToAdd] = useState({
    product_id: '',
    product_quantity: '',
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

  const addTransaction = async () => {
    setLoading(true);

    const body = JSON.stringify({
      ...(isClientTransaction ? { client_id: formValues.clientId } : { provider_id: formValues.providerId }),
      currency: formValues.currency,
      payment_method: formValues.paymentMethod,
      data_payment: formValues.dataPayment,
      products: formValues.products,
    });

    try {
      const response = await fetch(`${url}/transaction/${isClientTransaction ? 'client' : 'provider'}`, {
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
      setLoading(false);
      getTransactions();
      setFormValues(() => ({
        clientId: '',
        currency: '',
        paymentMethod: '',
        dataPayment: '',
        providerId: '',
        products: [],
      }));
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleProductFormChange = (e) => {
    setProductToAdd({ ...productToAdd, [e.target.name]: e.target.value });
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

  const addProductToTransaction = () => {
    setFormValues({
      ...formValues,
      products: [
        ...formValues.products,
        {
          ...productToAdd,
        },
      ],
    });

    setProductToAdd({
      product_id: 0,
      product_quantity: 0,
    });
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
    setFormValues,
    addTransaction,
    productToAdd,
    addProductToTransaction,
    handleProductFormChange,
  };
};
