import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import {PostType} from "../../types/PostType"
import { useInView } from "react-intersection-observer"
import {useEffect, useState} from "react"
import { Collapse } from '@mui/material'
import CommentType from "../../types/CommentType"
import Comments from "./Comments"
import axios from 'axios'
import { useTheme, Theme } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
        width: '500px',
    },
    [theme.breakpoints.up('md')]: {
        width: '800px',
    },
}));

const StyledCommentsContainer = styled.div`
  background-color: rgba(211,211,211,0.4);
`

const StyledButton = styled(Button)`
  text-transform: none;
`

const Post = ({title, body, id}: PostType) => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentType[]>([])

    const { ref, inView } = useInView({
        threshold: 0.2,
    });

    useEffect(() => {

        const fetchCommentsForPost = async(postId: number) => {
            const response = await axios.get<CommentType[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            if (response?.data) {
                setComments(response.data)
            }
        }

        if (inView) {
            // now the post is in the viewport, fetch its comments from the remote API if this is the 1st time being in the viewport
            if (comments.length === 0) {
                fetchCommentsForPost(id)
            }
        }

    }, [inView])

    const onClickHandler = (e: React.SyntheticEvent) => {
        setOpen(!open)
    }

    return (
        <StyledCard ref={ref} theme={theme}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <StyledButton size="small" onClick={onClickHandler}>{comments.length} Comments</StyledButton>
            </CardActions>

            {comments.length > 0 &&
                <StyledCommentsContainer>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Comments comments={comments}/>
                        </CardContent>
                    </Collapse>
                </StyledCommentsContainer>
            }
        </StyledCard>
    )
}

export default Post