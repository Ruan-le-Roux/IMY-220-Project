import React from 'react';
import { useParams } from 'react-router-dom';

import CommentComponent from './CommentComponent';

class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
        };
    }

    render() {
        return (
            <div>
                <CommentComponent id={this.state.id} />
            </div>
        );
    }
}

export default CommentList;
