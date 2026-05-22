'use client'

import { CommentsPanel } from '@/components/comments-panel'
import { useCommentPostMutation, useCommentQuery } from '@/store/services/api'

export default function CommentsSection({ id }) {
	return (
		<CommentsPanel
			id={id}
			useCommentsQuery={useCommentQuery}
			usePostComment={useCommentPostMutation}
			buildPostBody={content => ({ news: id, content })}
		/>
	)
}
