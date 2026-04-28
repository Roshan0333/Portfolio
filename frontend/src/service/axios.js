import axios from "axios";


const URL = "http://localhost:3000/api/v1"

export const postService = async (path, content, config = {}) => {
    try {
        const response = await axios.post(
            `${URL}${path}`,
            content,
            {
                ...config,
                withCredentials: true
            }
        )

        if (response.status === 200) {
            return { message: response.data.message, statusCode: response.status, data: response.data.data, fetchMessage: true, ok: true };
        }
    }
    catch (err) {
        if (err.response) {
            return { message: err.response.data.message, statusCode: err.response.status, fetchMessage: true, ok: false };
        }
        else {
            return { message: err.message, fetchMessage: false, ok: false }
        }
    }
}

export const getService = async (path) => {
    try {
        const response = await axios.get(
            `${URL}${path}`,
            { withCredentials: true }
        );

        if (response.status === 200) {
            return { message: response.data.message, statusCode: response.status, data: response.data.data, fetchMessage: true, ok: true }
        }
    }
    catch (err) {
        if (err.response) {
            return { message: err.response.data.message, statusCode: err.response.status, fetchMessage: true, ok: true };
        }
        else {
            return { message: err.messagem, fetchMessage: false, ok: false }
        }
    }
}

export const putService = async (path, content, config = {}) => {
    try {
        const response = await axios.put(
            `${URL}${path}`,
            content,
            {
                ...config,
                withCredentials: true
            }
        );

        if (response.status === 200) {
            return { message: response.data.message, statusCode: response.status, data: response.data.data, fetchMessage: true, ok: true }
        }
    }
    catch (err) {
        if (err.response) {
            return { message: err.response.data.message, statusCode: err.response.status, fetchMessage: true, ok: false }
        }
        else {
            return { message: err.message, fetchMessage: false, ok: false };
        }
    }
}

export const deleteService = async (path, content) => {
    try {
        const response = await axios.delete(
            `${URL}${path}`,
            content,
            { withCredentials: true }
        );

        if (response.status) {
            return { message: response.data.message, statusCode: response.status, data: response.data.data, fetchMessage: true, ok: true }
        }
    }
    catch (err) {
        if (err.response) {
            return { message: err.response.data.message, statusCode: err.response.status, fetchMessage: true, ok: true };
        }
        else {
            return { message: err.message, fetchMessage: true, ok: true }
        }
    }
}

export const patchService = async (path, content, config = {}) => {
    try {
        const response = await axios.patch(
            `${URL}${path}`,
            content,
            {
                ...config,
                withCredentials: true
            }
        );

        if (response.status === 200) {
            return { message: response.data.message, statusCode: response.status, data: response.data.data, fetchMessage: true, ok: true };
        }
    }
    catch (err) {
        if (err.response) {
            return { message: err.response.data.message, statusCode: err.response.status, fetchMessage: true, ok: true }
        }
        else {
            return { message: message, fetchMessage: true, ok: true }
        }
    }
}