function OAuth (opts) {
  //Login de usuarios
  document.querySelector(`#${opts.provider}`).addEventListener('click', () => {
      this._getProvider(opts.provider).addScope('https://www.googleapis.com/auth/userinfo.email')
      this._login(provider)
  })
}

OAuth.prototype._getProvider = function (provider) {
  switch (provider) {
    case 'google':
      console.log('google')
      return new firebase.auth.GoogleAuthProvider()
      break
    case 'facebook':
      console.log('facebook')
      return new firebase.auth.FacebookAuthProvider()
      break
    default:
  }
}

OAuth.prototype._login = function (type) {
  auth.signInWithPopup(provider)
    .then(function(res) {
      console.log('login con oauth', res.user, res.credential)
      // voy a guardar el perfil del usuario
      guardarPerfil(user.uid, generarObjPerfil());
    })
    .catch(function(err) {
      console.error('Error de autenticación: ', err.message);
    })
}
