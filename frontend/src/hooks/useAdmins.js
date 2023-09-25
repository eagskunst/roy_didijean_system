import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    password: '',
    email: '',
    address: '',
    name: '',
    username: '',
  });

  const [editFormValues, setEditFormValues] = useState({
    newUsername: '',
    name: '',
    username: '',
  });

  const getAdmins = async () => {
    try {
      const response = await fetch(`${url}/admin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setAdmins(() => dataResponse.admins);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username: formValues.username,
          user: {
            email: formValues.email,
            password: formValues.password,
            name: formValues.name,
          },
        }),
      });
      const dataResponse = await response.json();
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getAdmins();
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleEditFormChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value });
  };

  const updateAdmin = async () => {
    try {
      const response = await fetch(`${url}/admin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username: editFormValues.username,
          newUsername: editFormValues.newUsername,
          name: editFormValues.name,
        }),
      });
      const dataResponse = await response.json();
      if (response.ok) {
        return dataResponse;
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getAdmins();
      setLoading(false);
    }
  };

  const deleteAdmin = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/admin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username,
        }),
      });
      const dataResponse = await response.json();
      if (response.ok) {
        return dataResponse;
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getAdmins();
      setLoading(false);
    }
  };
  useEffect(() => {
    getAdmins();
  }, []);

  return { admins, loading, formValues, editFormValues, handleEditFormChange, handleFormChange, addAdmin, updateAdmin, deleteAdmin };
};
