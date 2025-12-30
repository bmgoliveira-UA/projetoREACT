import { loginCredentials, setCurrentUser } from '../data/login'
import { users } from '../data/userData'
import { KEYS } from '../config/constants'

export const login = (email, password) => {
    const loginExists = loginCredentials.find(credentials => credentials.email === email && credentials.password === password)

    if (!loginExists) {
        return null
    }

    const user = users.find(users => users.id === loginExists.userId)

    if (!user) {
        return null
    }

    setCurrentUser(user)
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user))
    return user

}


export const getCurrentUser = () => {
    const user = localStorage.getItem(KEYS.CURRENT_USER)
    return user ? JSON.parse(user) : false
}

export const logOut = () => {
    localStorage.removeItem(KEYS.CURRENT_USER)
}
