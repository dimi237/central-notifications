export const errorMsg = {
    400: "",
    403: "",
    404: "",
    500: "",
    NO_ACCOUNT: "No account is associated with this address",
    NO_COMPANY: "Company not found in system",
    INVALID_TOKEN: "Invalid reset token",
    NO_RESET_REQUEST: "No password reset request found for this account",
    BAD_CREDENTIAL: "Incorrect Credentials",
    ON_CREATION: "An error occurred while creating data",
    ON_UPDATE: "An error occurred while updating data",
    NOT_FOUND: "No data found",
    UNIT_NOT_FOUND: "No unit found for the sent value",
    NO_CATEGORY_AUTHORIZATION: "There are no permissions associated with this category",
    PRICE_EXISTE: "This price offer already exists",
    SHIPPING_EXIST: "This shipping already exists",
    ACCOUNT_EXISTE: "This account already exists",
    NOT_AUTHORIZE: "You do not have permission to perform this action",
    EXPIRE_TIME: "Expired code validity period",
    NOT_ACCEPTABLE: "This data is not acceptable",
    INSUFFICIENT_BALANCE: "Your account balance is insufficient to place this order",
    res: {
        appTokenNotProvided: "appToken must be included in" +
            " querystring/params/body for request",
        errorParsingObject: "Invalid JSON object provided",
        fileNotProvided: "Valid file not provided",
        idNotProvided: "Valid request ID not provided",
        bodyNotProvided: "Valid request body not provided",
        statusNotProvided: "Valid status not provided",
        userNotProvided: "Valid user not provided",
        errorOnCreation: "Valid user not provided",
    }
};

export const respMsg = {
    CREATED: "Data created successfully",
	UPDATED: "Update successfully",
	SUCCESS_OPERATION: "Operation completed successfully",
	USER_CREATED: "User created successfully",
	PASSWORD_RESET: "Password reset successfully",
};