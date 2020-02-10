const setJWT = (token) => {
  window.localStorage.setItem('jwt', token);
}

const removeJWT = () => {
  window.localStorage.removeItem('jwt');
}

const isUserAuthenticated = () => {
  return window.localStorage.getItem('jwt') !== null;
}

module.exports = {
  setJWT,
  removeJWT,
  isUserAuthenticated
}
