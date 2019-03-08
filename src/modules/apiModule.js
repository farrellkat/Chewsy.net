import settings from "./settings"

export default {
    getAllCategories() {
        return fetch(`${settings.localURL}/categories?parents=restaurants`).then(e => e.json())
    },
    getRestaurants(location, category1, category2, category3, randomNumber) {
        return fetch(`${settings.yelpAPI}/businesses/search?location=${location}&limit=1&categories=${category1},${category2},${category3}&offset=${randomNumber}&term=restaurants`).then(e => e.json())
    }
}