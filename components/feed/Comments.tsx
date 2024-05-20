import CommentType from "../../types/CommentType"
import Comment from "./Comment"
import List from '@mui/material/List'

type CommentsProps = {
    comments: CommentType[]
}

const Comments = ({comments}: CommentsProps) => {
    return (
        <List>
            {comments.map((comment, index) => (
                <Comment {...comment} key={index} last={comments.length === (index+1)}/>
            ))}
        </List>
    )
}

export default Comments