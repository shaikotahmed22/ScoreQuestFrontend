import axios from "axios";

export const addSquad = async ({ userId, token, selectedPlayer }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `https://scorequest.onrender.com/api/squad/addSquad`,
      { selectedPlayer, userId },
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

export const getSquad = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/squad/getSquad?userId=${userId}`,
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

export const deleteSquad = async ({ squadId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `https://scorequest.onrender.com/api/squad/deleteSquad?squadId=${squadId}`,
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

export const getSquadById = async ({ squadId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/squad/getSquadById?squadId=${squadId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
