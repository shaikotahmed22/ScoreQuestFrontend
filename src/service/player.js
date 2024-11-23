import axios from "axios";

export const addPlayer = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "https://scorequest.onrender.com/api/players/addPlayer",

      formData,
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

export const getPlayers = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/players/getPlayers?userId=${userId}`,
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

export const getPlayer = async ({ playerId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/players/getPlayer?playerId=${playerId}`,
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

export const updatePlayer = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "https://scorequest.onrender.com/api/players/updatePlayer",

      formData,
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

export const deletePlayer = async ({ playerId, userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `https://scorequest.onrender.com/api/players/deletePlayer?playerId=${playerId}&userId=${userId}`,
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

export const getTopPlayers = async () => {
  try {
    const { data } = await axios.get(
      `https://scorequest.onrender.com/api/players/rankedPlayer`
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
