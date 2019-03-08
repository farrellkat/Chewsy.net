import settings from "./settings"

export default {
  get(id) {
    return fetch(`${settings.usersURL}/users/${id}`).then(e => e.json())
  },
  matchLoginEmail(email) {
    return fetch(`${settings.usersURL}/users/?email=${email}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${settings.usersURL}/users/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.usersURL}/users`).then(e => e.json())
  },
  addUser(obj) {
    return fetch(`${settings.usersURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  searchUP(email, password) {
    return fetch(
      `${settings.usersURL}/users?email=${email}&password=${password}`
    ).then(e => e.json())
  },
  searchEmail(email) {
    return fetch(`${settings.usersURL}/users?email=${email}`).then(e =>
      e.json()
    )
  }
}
