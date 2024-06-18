const LoginInitialValues = { email: "", password: "" };
const ForgotInitialValues = { email: "" };
const ResetPasswordInitialValues = { password1: "", password2: "" };
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const SERVER_SUCCESS = "success"
const SERVER_FAILURE = "error"

export {LoginInitialValues, SERVER_URL, SERVER_SUCCESS,SERVER_FAILURE, GOOGLE_MAP_API_KEY, ForgotInitialValues, ResetPasswordInitialValues }