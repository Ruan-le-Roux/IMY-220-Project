import React from 'react';
import { Link } from 'react-router-dom';

import profilePic from '../../public/assets/images/profile-pic.png'

class CommentComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state ={
            id2: this.props.id,
            comments: [],
            error: false,
            errorMessage: '',
            finalComments: [],
            seeAll: false

        };

        // this.handleAll = this.handleAll.bind(this);
        this.handleSee = this.handleSee.bind(this);
    }

    async componentDidMount()
    {
        const {id2} = this.state;
        try
        {
            const res = await fetch(`/api/playlists/comments/${id2}`);
            const data = await res.json();
            // console.log(`data: ${data.data[0].id}`);

            if(res.ok)
            {
                this.setState({comments: data.data}, () => {
                    this.getOwner();
                });
            }
            else
            {
                // console.log("here is the error set")
                console.error(data.message);
                this.setState({error: true, errorMessage: "There are no comments on this playlist"});
            }
        }
        catch(error)
        {
            // console.log("here is the error set")
            console.error("Error when getting comments: ", error);
            this.setState({error: true, errorMessage: "There are no comments on this playlist"});
        }
    }

    async getOwner()
    {
        const {comments} = this.state;

        let temp = [];

        // console.log(`Comnets:dfiugbh: ${comments}`);

        // for(let k = 0; k < comments.length; k ++)
        // {
        //     console.log(`comment before function: ${comments[k].id}`);
        //     const assembledComment = await this.assembleComment(comments[k]);
        //     // const assembledComment = await this.assembleComment({...comment, userId: comment.userId});
        //     if (assembledComment) 
        //     {
        //         temp.push(assembledComment);
        //     }

        // }

        for (let comment of comments) {
            // console.log(`comment before function: ${comment.userId}`);
            const assembledComment = await this.assembleComment({...comment, userId: comment.userId});
            if (assembledComment) 
            {
                temp.push(assembledComment);
            }
        }

        // comments.map((comment) => {
        //     temp.push(assembleComment(comment));
        // });
        // console.log(`Comments: ${temp}`);

        this.setState({finalComments: temp});
    }

    async assembleComment(comment)
    {
        // console.log(`Commentsdfgkljhbnhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ${comment.userId}`);
        try
        {
            const res = await fetch(`/api/users/${comment.userId}`);
            const data = await res.json();

            if(res.ok)
            {
                // console.log("soiruihfgsodeurhg");
                return {
                    comment,
                    "name": data.data.name,
                    "surname": data.data.surname,
                    "profilePic": data.data.profilePicture
                };
                // const build ={
                //     comment,
                //     "name": data.data.name,
                //     "surname": data.data.surname,
                //     "profilePic": data.data.profilePicture
                // };
                // return build;
            }
            else
            {
                console.error(data.message);
                return;
            }
        }
        catch(error)
        {
            console.error("Error when getting owner of a comment: ", error);
        }
    }

    displayComments()
    {
        const {error, errorMessage, finalComments} = this.state;
        
        if(error === true)
        {
            return <h1>No comments on this playlist yet!</h1>
        }
        else
        {
            const limitedComments = finalComments.slice(0, 3);
            return limitedComments.map((comment) => (
                <div key={comment.comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <p className="text-gray-800 mb-2">{comment.comment.text}</p>

                    {comment.comment.image !== "no" && (
                        <img
                            src={comment.comment.image}
                            alt="picture someone commented"
                            title="picture someone commented"
                            className="mb-2 rounded-md shadow-sm"
                        />
                    )}

                    <section className="flex items-center mt-2">
                        <Link to={`/ProfilePage/${comment.comment.userId}`} className="flex items-center space-x-2">
                            <img 
                                src={comment.profilePic} 
                                alt="user's profile picture" 
                                title="user's profile picture" 
                                className="w-10 h-10 rounded-full border-2 border-gray-300"
                            />
                            <p className="text-gray-700 font-medium">
                                {comment.name} {comment.surname}
                            </p>                        
                        </Link>
                    </section>
                </div>
            ));
        }
    }

    // handleAll()
    // {
    //     const {error, errorMessage, finalComments} = this.state;
        
    //     if(error === true)
    //     {
    //         return <h1>No comments on this playlist yet!</h1>
    //     }
    //     else
    //     {
    //         // const limitedComments = finalComments.slice(0, 20);
    //         return finalComments.map((comment) => (
    //             <div key={comment.comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
    //                 <p className="text-gray-800 mb-2">{comment.comment.text}</p>

    //                 {comment.comment.image !== "no" && (
    //                     <img
    //                         src={comment.comment.image}
    //                         alt="picture someone commented"
    //                         title="picture someone commented"
    //                         className="mb-2 rounded-md shadow-sm"
    //                     />
    //                 )}

    //                 <section className="flex items-center mt-2">
    //                     <Link to={`/ProfilePage/${comment.comment.userId}`} className="flex items-center space-x-2">
    //                         <img 
    //                             src={comment.profilePic} 
    //                             alt="user's profile picture" 
    //                             title="user's profile picture" 
    //                             className="w-10 h-10 rounded-full border-2 border-gray-300"
    //                         />
    //                         <p className="text-gray-700 font-medium">
    //                             {comment.name} {comment.surname}
    //                         </p>                        
    //                     </Link>
    //                 </section>
    //             </div>
    //         ));
    //     }

    // }

    handleSee()
    {
        this.setState(prevState => ({ seeAll: !prevState.seeAll }));
    }

    deleteComment(commentId)
    {
        this.delete(commentId);
    }
    async delete(commentId)
    {
        try
        {
            const userId = localStorage.getItem('userId');
            console.log(`commetn: ${commentId}, user: ${userId} playlist: ${this.state.id2}`);
            const res = await fetch(`/api/playlists/delete-comment/${parseInt(this.state.id2)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "commentId": parseInt(commentId),
                    "userId": parseInt(userId)
                })
            });
            const data = await res.json();

            if(res.ok)
            {
                window.alert("Comment deleted");
            }
            else
            {
                window.alert("Comment not deleted");
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error while deling comment: ", error);
            window.alert("Comment not deleted");
        }
    }

    render()
    {
        if(this.state.seeAll === true)
        {
            const {error, errorMessage, finalComments} = this.state;
        
        if(error === true)
        {
            return <h1>No comments on this playlist yet!</h1>
        }
        else
        {
            // const limitedComments = finalComments.slice(0, 20);
            return finalComments.map((comment) => (
                <div key={comment.comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <button onClick={() => this.deleteComment(comment.comment.id)}>Delete comment</button>
                    <p className="text-gray-800 mb-2">{comment.comment.text}</p>

                    {comment.comment.image !== "no" && (
                        <img
                            src={comment.comment.image}
                            alt="picture someone commented"
                            title="picture someone commented"
                            className="mb-2 rounded-md shadow-sm"
                        />
                    )}

                    <section className="flex items-center mt-2">
                        <Link to={`/ProfilePage/${comment.comment.userId}`} className="flex items-center space-x-2">
                            <img 
                                src={comment.profilePic} 
                                alt="user's profile picture" 
                                title="user's profile picture" 
                                className="w-10 h-10 rounded-full border-2 border-gray-300"
                            />
                            <p className="text-gray-700 font-medium">
                                {comment.name} {comment.surname}
                            </p>                        
                        </Link>
                    </section>
                </div>
            ));
        }

        }
        return(
            <div>
                <button 
                        onClick={this.handleSee} 
                        className="text-cBlack font-medium hover:underline bg-cPink p-4 rounded"
                >
                    See all
                </button>
                {this.displayComments()}
            </div>
        );
    }
}

export default CommentComponent;