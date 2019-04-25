/**
 * Auth Prototype for firebase Auth service
 *
 * @param {Object} opts
 * * @opts.elems (required)
 * * @opts.elems.name (required)
 * * @opts.elems.email (required)
 * * @opts.elems.logout (required)
 * * @opts.onAuthStateChanges [optional]
 * * @opts.onAuthStateChanges.user (required)
 * * @opts.onAuthStateChanges.anon (required)
 * @return {undefined}
 */
function Auth (opts) {
  this.opts = opts
  // console.log(this.opts)
  this.render = new Render(opts.elems)
  // Accedo al servicio de autenticación & BBDD
  this.auth = firebase.auth()
  // console.log(this.auth)
  this.render.elems.actions.logout.addEventListener('click', this._logout.bind(this))
  // TODO: No endría por que autenticar un usuario anónimo nada mas entrar en la página.
  // O si, y luego eliminar el anónimo y guardar el perfil usado y al usuario existente o a uno nuevo.
  this._onAuthChange()
}

// Ejecuta la accion de desautenticación del usuario autenticado (sea anónimo o no)
Auth.prototype._logout = function () {
  // console.log(this.auth)
  this.auth.signOut()
    .then(() => {
      this.render.user()
    })
}

Auth.prototype._onAuthChange = function () {
  this.auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged', user)
    if (user) {
      // getId('logouticon').style.display = 'block';
      this.render.user(this._getAuthProfile)
      console.log('render: ', user)
    } else {
      // getId('logouticon').style.display = 'none';
      const userAnon = {
        name: 'Anon',
        email: 'anon@example.com',
        photoUrl: 'http://www.midominio.com/imagen-avatar-default.png'
      }
      this.render.user(userAnon)
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
