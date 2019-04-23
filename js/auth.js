/**
 * Auth Prototype for firebase Auth service
 *
 * @param {Object} opts
 * * @opts.id (required)
 * * @opts.logout (required)
 * * @opts.onAuthStateChanges [optional]
 * * @opts.onAuthStateChanges.user (required)
 * * @opts.onAuthStateChanges.anon (required)
 * @return {undefined}
 */
function Auth (opts) {
  // Accedo al servicio de autenticación & BBDD
  this.auth = firebase.auth()
  console.log(this.auth)
  this.opts = opts
  // console.log(this.opts)
  let logout = document.querySelector(`#${this.opts.id}`).addEventListener('click', this._logout)
  if (this.opts.onAuthStateChanges !== undefined) {
    this._onAuthChange()
  }
}

Auth.prototype._logout = function () {
  console.log(this.auth)
  this.auth.signOut()
    .then(this.opts.logout)
}

Auth.prototype._onAuthChange = function () {
  this.auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged', user)
    if (user) {
      // getId('logouticon').style.display = 'block';
      this.opts.onAuthStateChanges.user(this._getAuthProfile);
    } else {
      // getId('logouticon').style.display = 'none';
      const userAnon = {
        name: 'Anon',
        email: 'anon@example.com',
        photoUrl: 'http://www.midominio.com/imagen-avatar-default.png'
      }
      this.opts.onAuthStateChanges.anon(userAnon);
    }
  })
}

Auth.prototype._getAuthProfile = function () {
  const user = this.auth.currentUser;
  console.log('currentUser: ', user);
  if(user.providerData[0]){
    return {
      name: user.displayName || user.providerData[0].displayName || 'Nombre desconocido',
      email: user.email || user.providerData[0].email || 'no-email@example.com',
      photoUrl: user.photoURL || user.providerData[0].photoURL || 'http://www.midominio.com/imagen-avatar-default.png'
    }
  }
}
