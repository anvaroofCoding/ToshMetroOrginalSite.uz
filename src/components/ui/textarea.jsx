const Textarea = ({ className = '', ...props }) => {
	return (
		<textarea
			className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			{...props}
		/>
	)
}
export default Textarea
