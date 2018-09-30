import React, {Component} from "react";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }
    componentDidMount() {
        this.getUsersList();
    }
    render() {
        if (!this.state.users) return(<div>Loading</div>);
        if (this.state.users.length === 0) {
            return(
                <h2>No users found</h2>
            )
        }
        return(
            <div>
                <h2>List of users</h2>
                <ul>{
                    this.state.users.map(
                        (user, index) => (
                            <li key={index} >id: {user._id} name: {user.name}</li>
                        )
                    )}
                </ul>
            </div>
        )
    }

    getUsersList() {
        fetch('/users')
            .then((res) => res.json())
            .then(json => this.setState({ users: json }))
            .catch((err) => {
                console.error('Error in getting users: ' + err)
            })
    }
}

export default UsersList;