import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/material";
import Post from "../components/feed/Post";
import axios from  'axios'
import {PostType} from "../types/PostType";

type FeedProps = {
  posts: PostType[],
  metaDescription: string
}

export const getServerSideProps = (async () => {
  try {
    const res = await axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts')
    let allPostsTitles: string = ''

    if (res.data && res.data.length > 0) {
      const initialValue = ''
      // create 1 long string of all the posts' titles for an SEO meta tag, separated by '; '
      allPostsTitles = res.data.reduce((accumulatedPosts, post) => accumulatedPosts + (accumulatedPosts !== initialValue ? '; ' : '') + post.title, initialValue,)
    }

    return { props: {posts: res.data, metaDescription: allPostsTitles} }
  } catch (error: unknown) {
    if (error instanceof Error && error?.message) {
      console.error(error.message)
      throw error
    } else {
      console.error('unknown error has occurred while loading data')
      console.error(error)
      return {posts: {}, metaDescription: ''}
    }
  }

})

const Feed: NextPage<FeedProps> = ({posts, metaDescription}) => {
  return (
      <>
        <Head>
          <title>All Posts</title>
          <meta name="description" content={metaDescription}/>
        </Head>
        <Box component="section" display="flex" flexDirection="column" alignItems="center" p={2} gap={4}>
          {posts.map((post: PostType, index) => {
            return (
                <Post title={post.title} body={post.body} id={post.id} key={index}/>
            )
          })}
        </Box>
      </>
  )
}

export default Feed
