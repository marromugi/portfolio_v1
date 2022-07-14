import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box } from '../../components/atoms/box/common'
import { FlexBox } from '../../components/atoms/box/flex'
import { TransformBox } from '../../components/atoms/box/transform'
import { usePost } from '../../hooks/usePost'
import { Image } from '../../components/atoms/image/common'
import { BlogArticle } from '../../components/molucules/blog-article'
import useMediaQuery from '../../hooks/useMediaQuery'
import { ColorBox } from '../../components/atoms/box/color'
import { transitionState } from '../../utils/atoms'
import { useRecoilValue } from 'recoil'

export const Page = () => {
  const isMQ = useMediaQuery()
  const router = useRouter()
  const query = router.query
  const posts = usePost(query.slug as string)
  const [isReady, setReadyState] = useState(false)
  const isTransitioning = useRecoilValue(transitionState)

  useEffect(() => {
    if (posts.length > 0 && !isTransitioning) {
      setTimeout(() => setReadyState(true), 1150)
    }
  }, [posts, isTransitioning])

  if (posts.length <= 0) return <></>

  return (
    <FlexBox
      way={isMQ ? 'column' : 'row'}
      width={'100%'}
      height={'100%'}
      position={isMQ ? 'absolute' : 'relative'}
    >
      <Box
        width={isMQ ? '100%' : '50%'}
        height={'100%'}
        position={'relative'}
        shrink={'0'}
      >
        <FlexBox
          width={'100%'}
          height={'100%'}
          way={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <ColorBox
            width={isMQ ? '300px' : '20vw'}
            height={isMQ ? '520px' : '30vw'}
            opacity={isReady ? 1 : 0}
            transition={1}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={
                isReady ? 'scale(1.0) ' : isMQ ? 'scale(1.0)' : 'scale(1.8)'
              }
              origin={'center'}
              overflow={'hidden'}
              radius={'10px'}
              transition={1}
            >
              <TransformBox
                width={'100%'}
                height={'100%'}
                transform={isReady ? 'scale(1.0)' : 'scale(0.8)'}
                transition={1}
              >
                <Image
                  width={'100%'}
                  height={'100%'}
                  src={posts[0].thumbnail ? posts[0].thumbnail.url : '/dog.png'}
                  fit={'cover'}
                />
              </TransformBox>
            </TransformBox>
          </ColorBox>
        </FlexBox>
      </Box>
      <Box
        width={isMQ ? '100%' : '50%'}
        height={isMQ ? '50%' : '100%'}
        shrink={'0'}
        position={'relative'}
        overflowY={isMQ ? 'visible' : 'scroll'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          opacity={isReady ? 1 : 0}
          transition={1}
        >
          <FlexBox
            way={'column'}
            width={'100%'}
            height={'100%'}
            padding={'10vh 2em'}
            position={'absolute'}
          >
            <BlogArticle post={posts[0]} />
          </FlexBox>
        </ColorBox>
      </Box>
    </FlexBox>
  )
}

export default Page
