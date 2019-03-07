import settings from "./settings"

export default {
    getAllCategories() {
        return fetch(`${settings.localURL}/categories?parents=restaurants`).then(e => e.json())
    }
    // getRestaurants() {
    //     return fetch(`${settings.yelpAPI}/businesses/search?location=${location}&limit=1&categories=${categories}&offset=${randomNumber}&attributes=${attributes}`).then(e => e.json())
    // }
}