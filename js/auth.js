/**
 * Auth Prototype for firebase Auth service
 *
 * @param {Object} opts
 * * @opts.elems (required)
 * * @opts.elemes.name (required)
 * * @opts.elemes.email (required)
 * * @opts.elemes.logout (required)
 * * @opts.onAuthStateChanges [optional]
 * * @opts.onAuthStateChanges.user (required)
 * * @opts.onAuthStateChanges.anon (required)
 * @return {undefined}
 */
function Auth (opts) {
  // Accedo al servicio de autenticación & BBDD
  this.auth = firebase.auth()
  // console.log(this.auth)
  this.opts = opts
  console.log(this.opts)
  this.elems = JSON.parse(JSON.stringify(this.opts.elems))
  // TODO: inner method for buble & clean constructor
  this.elems.user.name = document.querySelector(`#${this.opts.elems.user.name}`)
  this.elems.user.email = document.querySelector(`#${this.opts.elems.user.email}`)
  this.elems.actions.logout = document.querySelector(`#${this.opts.elems.actions.logout}`)
  this.elems.actions.logout.addEventListener('click', this._logout.bind(this))
  this._onAuthChange()
}

// Ejecuta la accion de desautenticación del usuario autenticado (sea anónimo o no)
Auth.prototype._logout = function () {
  // console.log(this.auth)
  this.auth.signOut()
    .then(() => {
      this._renderAuthProfile()
    })
}

Auth.prototype._onAuthChange = function () {
  this.auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged', user)
    if (user) {
      // getId('logouticon').style.display = 'block';
      this._renderAuthProfile(this._getAuthProfile)
      console.log('render: ', user)
    } else {
      // getId('logouticon').style.display = 'none';
      const userAnon = {
        name: 'Anon',
        email: 'anon@example.com',
        photoUrl: 'http://www.midominio.com/imagen-avatar-default.png'
      }
      this._renderAuthProfile(userAnon)
      console.log('render: ', userAnon)
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

Auth.prototype._renderAuthProfile = function (user) {
  if (!user) {
    // console.log(this.elems, user)
    for (const elem of Object.values(this.elems.user)) {
      elem.innerHTML = ''
    }
  } else {
    // console.log(this.elems, user)
    this.elems.user.name.innerHTML = user.name
    this.elems.user.email.innerHTML = user.email
  }
}
