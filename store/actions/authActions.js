export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDL4iHmDxz7QT_UTI-jYiv37ELc2Gr7l9k",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData);
      let message = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "Email already exists";
      } else if (
        errorId === "WEAK_PASSWORD : Password should be at least 6 characters"
      ) {
        message = "Password should be at least 6 characters";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDL4iHmDxz7QT_UTI-jYiv37ELc2Gr7l9k",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email not found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "The password is incorrect";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
