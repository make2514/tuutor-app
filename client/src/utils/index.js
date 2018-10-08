export function goToPage(props, path) {
    props.history.push(path);
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