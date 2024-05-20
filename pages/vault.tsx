import type { NextPage } from "next";
import Head from "next/head";
import { Box, Grid } from "@mui/material";
import axios from  'axios'
import PhotoType from "../types/PhotoType";
import Thumbnail from "../components/vault/Thumbnail";
import Photo from "../components/vault/Photo";
import {useState} from "react";

type VaultProps = {
    photos: PhotoType[],
    metaDescription: string
}

export const getServerSideProps = (async () => {
    try {
        const res = await axios.get<PhotoType[]>('https://jsonplaceholder.typicode.com/photos')
        let allPostsTitles = ''
        const dataLength = res.data?.length || 0

        if (dataLength > 0) {
            // see my note 5. in README.md
            res.data.length = (dataLength > 100) ? 100 : dataLength

            const initialValue = ''
            // create 1 long string of all the posts' titles for an SEO meta tag, separated by '; '
            allPostsTitles = res.data.reduce((accumulatedPosts, post) => accumulatedPosts + (accumulatedPosts !== initialValue ? '; ' : '') + post.title, initialValue,)
            return { props: {photos: res.data, metaDescription: allPostsTitles} }
        }
    } catch (error: unknown) {
        if (error instanceof Error && error?.message) {
            console.error(error.message)
            throw error
        } else {
            console.error('unknown error has occurred while loading data')
            console.error(error)
            return {props: {}, metaDescription: ''}
        }
    }
})

const Vault: NextPage<VaultProps> = ({photos, metaDescription}) => {
    const [url, setUrl] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const onClickHandler = (url: string, title: string) => {
        setUrl(url)
        setTitle(title)
    }

    const closeHandler = () => {
        // without this clicking on the same thumnbail a 2nd time will not open the Photo since the url would not have changed
        setUrl(null)
    }

    return (
        <>
            <Head>
                <title>All Photos</title>
                <meta name="description" content={metaDescription}/>
            </Head>
            <Box component="section" sx={{ border: '1px dashed grey' }} p={2} gap={4}>
                <Grid container spacing={2}>
                    {photos.map((photo: PhotoType) => (
                        <Grid item xs="auto" key={photo.id}>
                            <Thumbnail {...photo} parentOnClickHandler={onClickHandler}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Photo url={url} closeHandler={closeHandler} title={title}/>
        </>
    )
}

export default Vault
