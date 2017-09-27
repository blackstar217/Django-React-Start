import * as types from './actions/types'
import { showMessage } from './actions/messages'

const getToken = (username, pass, cb) => {
	$.ajax({
		type: 'POST',
		url: '/api/obtain-auth-token/',
		data: {
			username: username,
			password: pass
		},
		success: function (res) {
			cb({
				authenticated: true,
				token: res.token
			})
		},
		error: (xhr, status, err) => {
			cb({
				authenticated: false
			})
		}
	})
}

export const login = (username, pass, cb) => {
	if (localStorage.token) {
		if (cb) cb(true)
		return
	}
	getToken(username, pass, (res) => {
		if (res.authenticated) {
			localStorage.token = res.token
			if (cb) {
				cb(true);
			}
		} else {
			if (cb) cb(false)
		}
	})
}

export const logout = () => {
	delete localStorage.token
}

export const loggedIn = () => {
	return !!localStorage.token
}

export const changePassword = (username, newpass, cb) => {
	$.ajax({
		type: 'POST',
		url: '/api/users/i/change-password/',
		data: {
			username: username,
			newpass: newpass
		},
		datatype: 'json',
		headers: {
			'Authorization': 'Token ' + localStorage.token
		},
		success: function (res) {
			console.log("change password success")
		},
		error: (xhr, status, err) => {
			console.log("change password error")
		}
	})
}



