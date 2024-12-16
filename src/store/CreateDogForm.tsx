import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFormData, resetForm } from '../store/formSlice';
import { createDog } from '../api';
import useLocalStorage from '../effects/useLocalStorage';

const CreateDogForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [token] = useLocalStorage('token', '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in first!');
      return;
    }
    createDog(formData, token)
      .then(() => {
        dispatch(resetForm());
        alert('Dog created successfully!');
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    dispatch(setFormData({ [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>
      <br />
      <label>
        Breed:
        <input
          type="text"
          value={formData.breed}
          onChange={(e) => handleChange('breed', e.target.value)}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="text"
          value={formData.color}
          onChange={(e) => handleChange('color', e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Dog</button>
    </form>
  );
};

export default CreateDogForm;
