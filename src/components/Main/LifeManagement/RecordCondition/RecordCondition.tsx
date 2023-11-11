import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { LifeScoreSlider } from './LifeScoreSlider';
import { CommentTextArea } from './CommentTextArea';
import { SendButton } from './SendButton';
import { usePostApi, UserGetRequest, UserGetResponse, HelathAddRequest, HealthAddResponse, UserApiUrl, HealthApiUrl } from '@/hooks/usePostApi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type RecordConditionProps = {
    user: User;
};
export const RecordCondition: React.FC<RecordConditionProps> = ({ user }) => {
    const [conditionScore, setConditionScore] = useState(0);
    const [conditionComment, setConditionComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const { submitData: submitGetUser } = usePostApi<UserGetRequest, UserGetResponse>(UserApiUrl + "get");
    const { submitData: submitAddHealth } = usePostApi<HelathAddRequest, HealthAddResponse>(HealthApiUrl + "add");

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError('');

        try {
            const request = { id: user.uid }
            const response = await submitGetUser(request);
            console.log(response);
        }
        catch (error) {
            if (error instanceof Error) {
                setSubmitError(`ユーザーの照合に失敗しました。: ${error.message}`);
            } else {
                setSubmitError('ユーザーの照合に失敗しました。もう一度お試しください。');
            }
            setSubmitSuccess(false);
            setIsSubmitting(false);
            return;
        }

        try {
            const request = { userId: user.uid, healthScore: conditionScore, comment: conditionComment, };
            const response = await submitAddHealth(request);
            console.log(response);
            setSubmitSuccess(true);
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(`体調情報の送信に失敗しました: ${error.message}`);
            } else {
                setSubmitError('体調情報の送信に失敗しました。もう一度お試しください。');
            }
            setSubmitSuccess(false);
            return;
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDisabled = isSubmitting || submitSuccess;

    return (
        <Box sx={{
            height: '80%',
            width: '100%',
            maxWidth: '4xl',
            my: 8,
            mx: 'auto',
            marginX: '5%',
            '& > *:not(:last-child)': {
                mb: 3,
            }
        }}>
            <LifeScoreSlider score={conditionScore} onScoreChange={setConditionScore} disabled={isDisabled} />
            <CommentTextArea comment={conditionComment} setComment={setConditionComment} disabled={isDisabled} />
            <SendButton handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitSuccess={submitSuccess} />
            {submitError && <Typography color="error">{submitError}</Typography>}
        </Box>
    );
};