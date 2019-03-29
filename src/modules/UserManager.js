import settings from "./settings"

export default {
  get(id) {
    return fetch(`${settings.appDataURL}/users/?authId=${id}`).then(e => e.json())
  },
  matchLoginEmail(email) {
    return fetch(`${settings.appDataURL}/users/?email=${email}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${settings.appDataURL}/users/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  addUser(obj) {
    return fetch(`${settings.appDataURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  getAllUsers() {
    return fetch(`${settings.appDataURL}/users`).then(e => e.json())
  },
  updateFavorite(id, obj) {
    return fetch(`${settings.appDataURL}/favorites/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  deleteFavorite(id) {
    return fetch(`${settings.appDataURL}/favorites/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getUserFavorites(id) {
    return fetch(`${settings.appDataURL}/favorites/?userId=${id}&_expand=user`).then(e => e.json())
  },
  searchUserFavorites(id, search) {
    return fetch(`${settings.appDataURL}/favorites/?userId=${id}&_expand=user&q=${search}`).then(e => e.json())
  },
  getAllFavorites() {
    return fetch(`${settings.appDataURL}/favorites/?_expand=user`).then(e => e.json())
  },
  searchAllFavorites(search) {
    return fetch(`${settings.appDataURL}/favorites/?_expand=user&q=${search}`).then(e => e.json())
  },
  getOneUserFavorite(id) {
    return fetch(`${settings.appDataURL}/favorites/${id}`).then(e => e.json())
  },
  searchOneUserFavorite(id, search) {
    return fetch(`${settings.appDataURL}/favorites/${id}?q=${search}`).then(e => e.json())
  },
  addUserFavorite(obj) {
    return fetch(`${settings.appDataURL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  getAllFriends(id) {
    return fetch(`${settings.appDataURL}/friends/?userId=${id}`).then(e => e.json())
  },
  followFriend(obj) {
    return fetch(`${settings.appDataURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  unfollowFriend(userId, friendId) {
    return fetch(`${settings.appDataURL}/friends/?userId=${userId}&fId=${friendId}`)
      .then(e => e.json())
      .then((user) => {
        return fetch(`${settings.appDataURL}/friends/${user[0].id}`, {
          method: "DELETE"
        }).then(e => e.json())
      })
  },
  deleteFriend(id) {
    return fetch(`${settings.appDataURL}/friends/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  searchUP(email, password) {
    return fetch(
      `${settings.appDataURL}/users?email=${email}&password=${password}`
    ).then(e => e.json())
  },
  searchEmail(email) {
    return fetch(`${settings.appDataURL}/users?email=${email}`).then(e =>
      e.json()
    )
  },
  searchAuthId(authId) {
    return fetch(`${settings.appDataURL}/users?authId=${authId}`).then(e =>
      e.json()
    )
  }
}
