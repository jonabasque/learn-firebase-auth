function Profile (opts) {
  // this.opts = opts
  this.db = opts.firebase.database()
}

Profile.prototype.send = function (uid, userData) {
  const ref = this.db.ref('users').child(this.uid)
  ref.once('value', (ss) => {
    // si no tengo el perfil, lo guardo
    if(!ss.val()) {
      ref.set(userData)
        .then(() => {
          console.log('Perfil creado')
        })
        .catch(err => {
          console.error('Error al crear el perfil: ', err)
        })
    }
  })
}

Profile.prototype.delete = function (uid) {
  this.db.ref('users').child(uid).remove();
}
