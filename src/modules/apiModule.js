import settings from "./settings"


export default {
    getAllCategories() {
        return fetch(`${settings.localURL}/categories?parents=restaurants`).then(e => e.json())
    },
    getAllStates() {
        return fetch(`${settings.appDataURL}/states`).then(e => e.json())
    },
    getAllRadii() {
        return fetch(`${settings.appDataURL}/radius`).then(e => e.json())
    },
    getRestaurantSearchTotal(city, state, category1, category2, category3) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}&categories=${category1}${category2}${category3}`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    },
    getRandomRestaurant(city, state, category1, category2, category3, randomNumber) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}&categories=${category1}${category2}${category3}&offset=${randomNumber}`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    },
    getTotalRestaurants(city, state) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    },
    getAllRestaurantsInCity(city, state) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}&limit=50`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    },
    getAllRestaurantsInCityOffset(city, state, offset) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}&limit=50&offset=${offset}`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    },
    getRandomSurpriseRestaurant(city, state, radius, randomNumber) {
        return fetch(`${settings.yelpAPI}/businesses/search?term=restaurants&location=${city},${state}&offset=${randomNumber}`,
            {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Vary": "Origin",
                    "x-requested-with": "xmlhttprequest",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer n9YRlOPUxhmrIr55VN55-t0ARdtuLtGn3T1tDxR0JRNcoZmj6Bgf9HNvMRAoJgNWs3_CEy9r7-KlHoIurAm0_01ho2bkbLekH2rVJSEM1fC6LV9iYgRtWwLbTsx1XHYx"
                }
            }
        ).then(e => e.json())
    }
}