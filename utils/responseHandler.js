const responseSuccess = (res, data, message, status) => {
    const response = {
        status,
        message,
        data,
    };
    return res.status(status).json(response);
};

const responseError = (res, error, status) => {
    const response = {
        status,
        error,
    };
    return res.status(status).json(response);
};

module.exports = { responseSuccess, responseError };
