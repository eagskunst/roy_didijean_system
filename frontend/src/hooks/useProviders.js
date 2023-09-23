import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

export const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    birthDate: '',
    cedula: '',
    email: '',
    address: '',
    name: '',
    phone_number: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  const getProviders = async () => {
    try {
      const response = await fetch(`${url}/provider`, {
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

  const addProvider = async (id = 0) => {
    setLoading(true);
    if (!isEdit) {
      try {
        const response = await fetch(`${url}/provider/independent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            birthDate: formValues.birthDate,
            cedula: formValues.cedula,
            provider: {
              email: formValues.email,
              address: formValues.address,
              name: formValues.name,
              phone_number: formValues.phone_number,
            },
          }),
        });
        const dataResponse = await response.json();
        if (response.ok) {
          console.log(dataResponse);
        }
        throw new Error(dataResponse.message);
      } catch (error) {
        return {};
      } finally {
        getProviders();
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`${url}/provider/independent/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            birthDate: formValues.birthDate,
            cedula: formValues.cedula,
            provider: {
              email: formValues.email,
              address: formValues.address,
              name: formValues.name,
              phone_number: formValues.phone_number,
            },
          }),
        });
        const dataResponse = await response.json();
        if (response.ok) {
          console.log(dataResponse);
        }
        throw new Error(dataResponse.message);
      } catch (error) {
        return {};
      } finally {
        setIsEdit(false);
        getProviders();
        setLoading(false);
      }
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const deleteProvider = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/provider/independent/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        console.log(dataResponse);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getProviders();
      setLoading(false);
    }
  };
  useEffect(() => {
    getProviders();
  }, []);

  return { providers, loading, formValues, handleFormChange, addProvider, deleteProvider, setIsEdit };
};
