import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔹 Get today's APOD
export const getTodayApod = () => {
  return api.get("/apod");
};

// 🔹 Get APOD by specific date
export const getApodByDate = (date) => {
  return api.get("/apod", {
    params: { date },
  });
};

// 🔹 Get APOD range (Gallery)
export const getApodRange = (startDate, endDate) => {
  return api.get("/apod", {
    params: {
      startDate,
      endDate,
    },
  });
};

export default api;
