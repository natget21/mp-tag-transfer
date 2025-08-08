const errorMsg = {
  UNABLE_TO_ADD_TO_DEVICEID: "Unable To Add To Device Id",
  UNABLE_TO_GET_DEVICEID: "Unable To Get Device Id",
  UNABLE_TO_UPDATE_DEVICEID: "Unable To Update Device Id",
  UNABLE_TO_REMOVE_DEVICEID: "Unable To Remove Device Id",

  UPLOAD_FAILED: "Upload Failed !",
  UNABLE_TO_ADD_UPLOAD_DATA: "Unable To Upload Data",
  UPLOAD_DATA_NOT_FOUND: "Upload Data Not Found"
};

const code = {
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOTFOUND: 404
}

const successMsg = {
    LOGIN_SUCCESSFULL: "Login Successfull !",
    SUCCESSFULLY_COMPLETED: "Successfully Completed !",
    SUCCESSFULLY_CREATED: "Successfully Created !",
    SUCCESSFULLY_ADDED: "Successfully Added !",
    SUCCESSFULLY_UPDATED: "Successfully Updated !",
    SUCCESSFULLY_REMOVED: "Successfully Removed !",
    SUCCESSFULLY_SENT:"Successfully Sent !",
    SUCCESS: "Success"
}

module.exports.errorMsg = errorMsg;
module.exports.code = code;
module.exports.successMsg = successMsg;

