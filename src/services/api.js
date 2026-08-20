import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


// =====================================================
// INVENTORY
// =====================================================

export const getInventory = async () => {
  const response = await API.get("/inventory");
  return response.data;
};

export const updateInventory = async (id, units) => {
  const response = await API.put(
    `/inventory/${id}?units=${units}`
  );

  return response.data;
};


// =====================================================
// RESERVATION - USER CREATES
// =====================================================

export const createReservation = async (data, token) => {
  const response = await API.post(
    "/reservation",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// RESERVATION - BLOOD BANK
// =====================================================

export const getReservations = async () => {

  const token =
    await AsyncStorage.getItem("token");

  const response = await API.get(
    "/reservation",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const approveReservation = async (id) => {

  const token =
    await AsyncStorage.getItem("token");

  const response = await API.put(
    `/reservation/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// USER RESERVATION
// =====================================================

export const getMyReservation = async (token) => {

  const response = await API.get(
    "/reservation/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// BLOOD REQUESTS
// =====================================================

export const getAllRequests = async () => {

  const token =
    await AsyncStorage.getItem("token");

  const response = await API.get(
    "/request/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - CREATE / BROADCAST
// =====================================================

export const createSOS = async (data, token) => {

  const response = await API.post(
    "/sos",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - AVAILABLE TO OTHER USERS
// =====================================================

export const getAvailableSOS = async (token) => {

  const response = await API.get(
    "/sos/available",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - USER'S OWN REQUESTS
// =====================================================

export const getMySOS = async (token) => {

  const response = await API.get(
    "/sos/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - DONOR ACCEPTS
// =====================================================

export const acceptSOS = async (id, token) => {

  const response = await API.put(
    `/sos/${id}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - REQUESTER CONFIRMS DONOR
// =====================================================

export const confirmSOS = async (id, token) => {

  const response = await API.put(
    `/sos/${id}/confirm`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// SOS - DONOR'S ACCEPTED REQUESTS
// =====================================================

export const getAcceptedSOS = async (token) => {

  const response = await API.get(
    "/sos/accepted",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================================
// DEFAULT API
// =====================================================

export default API;