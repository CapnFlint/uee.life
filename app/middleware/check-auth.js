import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import { subSeconds, isAfter, getMilliseconds } from 'date-fns'

export default function ({ store, req }) {
   // If nuxt generate, pass this middleware
  if (process.server && !req) return
  const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage()
  
  if(loggedUser) {
    store.dispatch('setUser', loggedUser['user'])
    store.dispatch('storeToken', { token: loggedUser['token'], expiry: loggedUser['token_expiry'] })

    let now = new Date()
    let expiry = new Date(loggedUser['token_expiry'])
    if (isAfter(now, subSeconds(expiry, 600))) {
      console.log("Token expired or about to expire. Refreshing...")
      store.commit('REFRESH_TOKEN', true)
    } 
  }
}
