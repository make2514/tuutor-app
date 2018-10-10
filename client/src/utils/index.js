export function goToPage(props, path, queryParamStr = '') {
    props.history.push(path + queryParamStr);
}

export function apiRequest(token) {
    return fetch('/signin')
    .then((res) => res.json())
    .then(json => this.setState({ users: json }));
}

export function didUserLogin() {
    // search in localStorage for token
    // if it exists and still valid (verify by calling a backend api), then redirect to ticketFeed view
    // else, render the login view
}

export function getCurrentUserInfo() {
    return fetch('/users/currentUser', {
        method: 'get',
        headers: new Headers({
            'Authorization': localStorage.getItem('authToken')
        })
    })
    .then(res => res.json())
}