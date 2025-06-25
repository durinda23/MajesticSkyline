import axios from "axios";

const API_URL = "http://majesticapi/properties.php";

export const getProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export const addProperty = async (property) => {
  try {
    await axios.post(API_URL, property);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
  }
};
