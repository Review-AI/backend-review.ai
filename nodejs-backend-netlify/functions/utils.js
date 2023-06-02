const setAPIResponse = ({status, message, error, data} = null) => {
    let apiResponse ={}
    apiResponse["status"] = status? status : "success"
    apiResponse["message"] = message? message : null
    apiResponse["error"] = error? error : null
    apiResponse["data"] = data? data : {}
    return apiResponse
}

export {setAPIResponse}

module.exports = {setAPIResponse}