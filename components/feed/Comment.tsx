import CommentType from "../../types/CommentType"
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'

type CommentProps = CommentType & {
    last: boolean
}

const StyledTypography = styled(Typography)`
    display: inline;
    color: rgba(0, 0, 0, 0.87);
` as typeof Typography

const Comment = ({name, body, email, last}: CommentProps) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={email}
                    secondary={
                        <>
                            <StyledTypography
                                component="span"
                                variant="body2"
                            >
                                {name}
                            </StyledTypography>
                            &nbsp;-&nbsp;{body}
                        </>
                    }
                />
            </ListItem>
            {!last && <Divider component="li"/>}
        </>
    );
};

export default Comment