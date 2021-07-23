const authReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return (state = true);
    case "SIGN_OUT":
      return state;
  }
};

export default authReducer;
