'use client'

import { CommentsPanel } from '@/components/comments-panel'
import {
	useCommentPostTenderMutation,
	useCommentTenderQuery,
} from '@/store/services/api'

export default function CommentTender({ id }) {
	return (
		<CommentsPanel
			id={id}
			useCommentsQuery={useCommentTenderQuery}
			usePostComment={useCommentPostTenderMutation}
			buildPostBody={content => ({ announcement: id, content })}
		/>
	)
}
