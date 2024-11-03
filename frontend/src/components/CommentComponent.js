import React from 'react';

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

        };
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
            const limitedComments = finalComments.slice(0, 20);
            return limitedComments.map((comment) => (
                <div key={comment.comment.id}>
                    <p>{comment.comment.text}</p>
                    
                    <img src={comment.comment.image} alt="picture someone commented" title="picture someone commented"/>

                    <section>
                        <img src={comment.profilePic} alt="users profile picture" title="users profile picture"/>

                        <p>{comment.name} {comment.surname}</p>
                    </section>
                </div>
            ));
        }
    }

    render()
    {
        return(
            <div>
                {this.displayComments()}
            </div>
        );
    }
}

export default CommentComponent;