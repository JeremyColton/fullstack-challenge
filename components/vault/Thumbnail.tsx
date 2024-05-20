import React from 'react'
import PhotoType from "../../types/PhotoType"
import Image from "next/image"
import styled from "@emotion/styled"

const StyledImage = styled(Image)`
  cursor: pointer;
`

const Thumbnail = ({url, thumbnailUrl, title, parentOnClickHandler}: PhotoType) => {

    const onClickHandler = (e: React.SyntheticEvent) => {
        parentOnClickHandler(url, title)
    }

    return (
        <StyledImage src={thumbnailUrl} width={150} height={150} alt={title} onClick={onClickHandler}/>
    )
}

export default Thumbnail