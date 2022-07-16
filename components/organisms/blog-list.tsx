import { Post } from '../../hooks/usePost'
import { FlexBox } from '../atoms/box/flex'
import { BlogItem } from '../molucules/blog-item'

export const BlogList = (props: { posts: Post[] }) => {
  return (
    <FlexBox
      width={'100%'}
      height={'fit-content'}
      overflowY={'hidden'}
      way={'column'}
    >
      {props.posts.map((p, i) => (
        <BlogItem key={i} index={i} post={p} />
      ))}
      {props.posts.map((p, i) => (
        <BlogItem key={i} index={i} post={p} />
      ))}
      {props.posts.map((p, i) => (
        <BlogItem key={i} index={i} post={p} />
      ))}
      {props.posts.map((p, i) => (
        <BlogItem key={i} index={i} post={p} />
      ))}
    </FlexBox>
  )
}
