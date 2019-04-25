function Render (elems) {
  this.elems = JSON.parse(JSON.stringify(elems))
  // TODO: inner method for buble & clean constructor
  this.elems.user.name = document.querySelector(`#${this.elems.user.name}`)
  this.elems.user.email = document.querySelector(`#${this.elems.user.email}`)
  this.elems.actions.logout = document.querySelector(`#${this.elems.actions.logout}`)

  return this
}

Render.prototype.user = function (user) {
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
