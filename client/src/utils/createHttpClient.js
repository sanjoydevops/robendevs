import axios from "axios";

export default function createChannel() {
    const controller = new AbortController();
    const token = localStorage.getItem("r-token");
    const baseURL = process.env.REACT_APP_API_URL || "/api/v1/";
    console.log("API Base URL:", baseURL);
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const request = axios.create({
        baseURL,
        headers,
        signal: controller.signal,
    });
    return { request, controller }
};