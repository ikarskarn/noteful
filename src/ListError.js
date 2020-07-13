import React from 'react';

class ListError extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            hasError: false,
        })
    }

    static getDerivedStateFromError(error) {
        return {hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return(
                <h2>Could not show the Folder List, try again later</h2>
            )
        }
        return this.props.children;
    }
}

export default ListError;