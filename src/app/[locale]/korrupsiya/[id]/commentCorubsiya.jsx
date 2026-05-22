'use client'

import { CommentsPanel } from '@/components/comments-panel'
import {
	useCorrubsiyaCommentQuery,
	useCorrubsiyaPostMutation,
} from '@/store/services/api'

export default function CommentCorubsiya({ id }) {
	return (
		<CommentsPanel
			id={id}
			useCommentsQuery={useCorrubsiyaCommentQuery}
			usePostComment={useCorrubsiyaPostMutation}
			buildPostBody={content => ({ korrupsiya: id, content })}
		/>
	)
}
