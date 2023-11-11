type CommentTextAreaProps = {
    comment: string;
    setComment: (comment: string) => void;
    disabled: boolean;
};

export const CommentTextArea: React.FC<CommentTextAreaProps> = ({ comment, setComment, disabled }) => {
    return (
        <textarea
            placeholder="コメントを入力"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={disabled}
            style={{
                width: '100%',
                marginBottom: '1rem',
                padding: '0.5rem',
                border: '1px solid',
                borderRadius: '4px',
            }}
        />
    );
};