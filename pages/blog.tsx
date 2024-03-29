import { useEffect, useState } from 'react'
import { Box } from '../components/atoms/box/common'
import { FlexBox } from '../components/atoms/box/flex'
import { ColorBox } from '../components/atoms/box/color'
import { Word } from '../components/atoms/text/common'
import { BlogList } from '../components/organisms/blog-list'
import useMediaQuery from '../hooks/useMediaQuery'
import { headState, transitionState } from '../utils/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Post } from '../hooks/usePost'

export const Page = (props: { posts: Post[] }) => {
  const isMQ = useMediaQuery()
  const [isShow, setShow] = useState(false)
  const isTransitioning = useRecoilValue(transitionState)
  const setHead = useSetRecoilState(headState)

  useEffect(() => {
    if (!isTransitioning) {
      setShow(true)
      setHead({ title: 'BLOG | Tomoki Shimizu', ogImage: './dog.png' })
    }
  }, [isTransitioning])

  return (
    <ColorBox
      width={'100%'}
      height={'100%'}
      opacity={isShow ? 1 : 0}
      transition={0.5}
    >
      <FlexBox
        way={isMQ ? 'column' : 'row'}
        width={'100%'}
        height={'100%'}
        position={isMQ ? 'absolute' : 'relative'}
      >
        <Box
          width={isMQ ? '100%' : '50%'}
          height={isMQ ? '50%' : '100%'}
          shrink={'0'}
          position={'relative'}
        >
          <FlexBox
            width={'100%'}
            height={'100%'}
            way={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Word
              size={'4em'}
              weight={'600'}
              family={"'Zen Kaku Gothic New', sans-serif"}
              h_space={'0.16em'}
            >
              BLOG
            </Word>
          </FlexBox>
        </Box>
        <Box
          width={isMQ ? '100%' : '50%'}
          height={isMQ ? 'auto' : '100%'}
          position={'relative'}
          shrink={'0'}
          overflowY={isMQ ? 'visible' : 'scroll'}
        >
          <Box
            width={'100%'}
            height={'auto'}
            position={isMQ ? 'relative' : 'absolute'}
            padding={'2em'}
          >
            {props.posts && <BlogList posts={props.posts} />}
          </Box>
        </Box>
      </FlexBox>
    </ColorBox>
  )
}

export default Page

export const getStaticProps = async () => {
  try {
    // const origin = process.env.SOYO_ORIGIN
    const data = await fetch(`${process.env.CMS_ORIGIN}/api/post?category=blog`)
    if (data.status !== 200) {
      return {
        props: {
          posts: []
        },
        revalidate: 60 * 60 * 24
      }
    }

    const posts: Post[] = await data.json()

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts))
      },
      revalidate: 60 * 60 * 24
    }
  } catch {
    return {
      props: {
        posts: []
      },
      revalidate: 60 * 60 * 24
    }
  }
}
