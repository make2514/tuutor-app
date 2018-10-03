export function goToPage(props, path) {
    props.history.push(path);
}

export function apiRequest(token) {
    return fetch('/signin')
    .then((res) => res.json())
    .then(json => this.setState({ users: json }));
}