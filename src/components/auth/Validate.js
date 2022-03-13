export const isEmail = (value) => {
  const email = /^[a-zA-Z0-9]+[a-zA-Z0-9._]*@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;
  if (value.match(email)) {
    return true;
  }
  return false;
};

export const isPassword = (value) => {
  const password = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (value.match(password)) {
    return true;
  }
  return false;
};
