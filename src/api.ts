import axios from 'axios';

const BASE_URL = 'https://dogs.kobernyk.com/api/v1';

export const fetchDogById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/dogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dog');
  }
};

export const createDog = async (dogData: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/dogs`, dogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create dog');
  }
};
