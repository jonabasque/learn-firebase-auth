/**
 * Provider Prototype for firebase Auth service
 *
 * @param {Object} opts
 * * @opts.provider (required)
 * @return {undefined}
 */

function AuthProvider (providers) {
  this.auth = {}
  this._setProviders(providers)
}

AuthProvider.prototype._setProviders = function (providers) {
  providers.forEach((provider) => {
    this.auth[provider] = this._getProvider(provider)
  })
}

AuthProvider.prototype._getProvider = function (provider) {
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
