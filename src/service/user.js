import axios from "axios";

export const signup = async ({ name, email, phone, password }) => {
  try {
    const { data } = await axios.post(
      "https://scorequest.onrender.com/api/users/register",
      {
        name,
        email,
        phone,
        password,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const login = async ({ valueType, value, password }) => {
  try {
    const { data } = await axios.post(
      "https://scorequest.onrender.com/api/users/login",
      {
        value,
        password,
        valueType,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUsers = async ({
  token,
  searchKeywords,
  limit = 10,
  page = 1,
  userId,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/users/getAllUsers?search=${searchKeywords}&limit=${limit}&page=${page}&userId=${userId}`,
      config
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUser = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/users/getUser?userId=${userId}`,
      config
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateUserProfile = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `https://scorequest.onrender.com/api/users/updateUser`,

      formData,
      config
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
