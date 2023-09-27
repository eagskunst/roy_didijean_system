import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

export const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    email: '',
    address: '',
    name: '',
    phone_number: '',
    birthDate: '',
    cedula: '',
    company_name: '',
    rif: '',
  });

  const [isIndependetProvider, setIndependetProvider] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);

  const providerType = isIndependetProvider ? 'independent' : 'company';

  const getProviders = async () => {
    try {
      const response = await fetch(`${url}/provider${isIndependetProvider ? '/allindependent' : '/allcompany'}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setProviders(() => [...dataResponse.data]);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  };

  const addProvider = async () => {
    setLoading(true);

    const body = JSON.stringify({
      provider: {
        email: formValues.email,
        address: formValues.address,
        name: formValues.name,
        phone_number: formValues.phone_number,
      },
      ...(isIndependetProvider
        ? {
            birthDate: formValues.birthDate,
            cedula: formValues.cedula,
          }
        : {
            company_name: formValues.company_name,
            rif: formValues.rif,
          }),
    });

    try {
      const response = await fetch(`${url}/provider/${providerType}${isEdit ? `/${idToEdit}` : ''}`, {
        method: !isEdit ? 'POST' : 'PUT',
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
      getProviders();
      setLoading(false);
      setIsEdit(false);
      setIdToEdit(0);
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e) => {
    setIndependetProvider(e.target.checked);
  };

  const deleteProvider = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/provider/${providerType}${`/${id}`}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getProviders();
      setLoading(false);
      setIsEdit(false);
      setIdToEdit(0);
    }
  };

  useEffect(() => {
    getProviders();
  }, [isIndependetProvider]);

  return {
    providers,
    loading,
    formValues,
    isIndependetProvider,
    isEdit,
    idToEdit,
    handleFormChange,
    addProvider,
    deleteProvider,
    setIsEdit,
    setIndependetProvider,
    handleSwitchChange,
    setIdToEdit,
  };
};
