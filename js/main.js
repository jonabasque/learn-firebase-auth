const opts = {
  id: 'logout',
  logout: function() {
    console.info('Desautenticación (logout) realizado!')
  },
  onAuthStateChanges: {
    user: function(profile) {
      const name = document.querySelector('#user_name')
      const email = document.querySelector('#user_email')
      name.innerHTML = profile.name
      email.innerHTML = profile.email
      console.log('user with profile: ', profile)
    },
    anon: function(profile) {
      const name = document.querySelector('#user_name')
      const email = document.querySelector('#user_email')
      name.innerHTML = profile.name
      email.innerHTML = profile.email
      console.log('user anonimous: ', profile)
    }
  }
}

const auth = new Auth(opts)
// console.log(auth)
