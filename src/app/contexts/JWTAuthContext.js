import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // async function LoginUser(email, password) {
    // const FCMToken = await getData('FCMToken');
    //    var myHeaders = new Headers();
    //    myHeaders.append('Cookie', 'PHPSESSID=4b3d477397c34740a14ee218ca78f631');
    //     return fetch('http://localhost:4000/login', {
    //         method: 'POST',
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(email, password)
    //     }).then(data => data.json())
    // }
    const login = async (email, password) => {
        // let user = [];
        // let acccessToken = [];
        // const response = await axios.post('/api/auth/login', {
        const response = await axios.post('http://localhost:4000/login', {
            email,
            password,

        })
        console.log('response.data', response.data.response[0]?.fcm_key)
        // cJFXyJH9TuGczQH2Q22mn8:APA91bF8eTEFCo2TNL4ZD7nDmHZ7uPl20FZQPhJ3QL_qWP2kaOVsos5FO83I9qTjOlKVt6KrmlB6S9lqh3F2MShTQHeEZi-kt8nKUQa8G6DWuwAhQRT-gogWki53BTdHsqonvrAWNCem
        // .then((response) => {
        //     let responseData;
        //     // console.log('response.data', response.data);
        //     responseData = response.data.response;
        //     for (let i = 0; i < responseData.length; i++) {
        //         const email = responseData[i].email;
        //         const pass = responseData[i].pass;
        //         const fcm_key = responseData[i].fcm_key;

        //         user.push({
        //             email: email,
        //             password: pass,
        //         })
        //         acccessToken.push({
        //             fcm_key: fcm_key,
        //         })
        //     }
        //     console.log('user', user)
        //     console.log('accessToken', accessToken)
        //     const { user } = user
        //     const { accessToken } = accessToken
        //     setSession(accessToken)

        // }).catch(() => {
        //     console.log("Invalid Credentials");
        // })
        // fcm_key
        const { accessToken, user } = response.data
        setSession(accessToken)


        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get('/api/auth/profile')
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
