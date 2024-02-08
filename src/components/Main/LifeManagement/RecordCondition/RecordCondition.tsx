import React, { useState } from "react";
import { User } from "firebase/auth";
import { LifeScoreSlider } from "./LifeScoreSlider";
import { CommentTextArea } from "./CommentTextArea";
import { SendButton } from "./SendButton";
import {
    usePostApi,
    UserGetRequest,
    UserGetResponse,
    HealthAddRequest,
    HealthAddResponse,
    UserApiUrl,
    HealthApiUrl,
} from "@/hooks/usePostApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TimeSelectButton } from "./TimeSelectButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Height } from "@mui/icons-material";

type RecordConditionProps = {
    user: User;
};
export const RecordCondition: React.FC<RecordConditionProps> = ({ user }) => {
    const [conditionScore, setConditionScore] = useState(0);
    const [conditionComment, setConditionComment] = useState("");
    const [medicineName, setMedicineName] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const { submitData: submitGetUser } = usePostApi<
        UserGetRequest,
        UserGetResponse
    >(UserApiUrl + "get");
    const { submitData: submitAddHealth } = usePostApi<
        HealthAddRequest,
        HealthAddResponse
    >(HealthApiUrl + "add");

    const handleSubmit = async (date: Date) => {
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError("");

        try {
            const request = { id: user.uid };
            await submitGetUser(request);
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(
                    `ユーザーの照合に失敗しました。: ${error.message}`
                );
            } else {
                setSubmitError(
                    "ユーザーの照合に失敗しました。もう一度お試しください。"
                );
            }
            setSubmitSuccess(false);
            setIsSubmitting(false);
            return;
        }

        try {
            const timestampReq = Math.floor(date.getTime() / 1000);
            const request = {
                userId: user.uid,
                healthScore: conditionScore,
                comment: conditionComment,
                timestamp: timestampReq,
                medicineName: medicineName,
            };
            await submitAddHealth(request);
            setSubmitSuccess(true);
        } catch (error) {
            if (error instanceof Error) {
                setSubmitError(
                    `体調情報の送信に失敗しました: ${error.message}`
                );
            } else {
                setSubmitError(
                    "体調情報の送信に失敗しました。もう一度お試しください。"
                );
            }
            setSubmitSuccess(false);
            return;
        } finally {
            setIsSubmitting(false);
        }
    };
    const isDisabled = isSubmitting || submitSuccess;

    return (
        <Box
            sx={{
                height: "80%",
                width: "100%",
                maxWidth: "4xl",
                my: 8,
                mx: "auto",
                marginX: "5%",
                "& > *:not(:last-child)": {
                    mb: 3,
                },
            }}
        >
            <LifeScoreSlider
                score={conditionScore}
                onScoreChange={setConditionScore}
                disabled={isDisabled}
            />
            <CommentTextArea
                comment={conditionComment}
                setComment={setConditionComment}
                disabled={isDisabled}
            />

            <Box sx={{ my: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="medicine-select-label">薬を選択</InputLabel>
                    <Select
                        labelId="medicine-select-label"
                        id="medicine-select"
                        value={medicineName}
                        label="薬を選択"
                        onChange={(e) => setMedicineName(e.target.value)}
                        disabled={isDisabled}
                    >
                        <MenuItem
                            value=""
                            style={{ height: "50px" }}
                        ></MenuItem>
                        <MenuItem value="とA" style={{ height: "50px" }}>
                            とA
                        </MenuItem>
                        <MenuItem value="とB" style={{ height: "50px" }}>
                            とB
                        </MenuItem>
                        <MenuItem value="とC" style={{ height: "50px" }}>
                            とC
                        </MenuItem>
                        <MenuItem value="夜" style={{ height: "50px" }}>
                            夜
                        </MenuItem>
                        <MenuItem value="寝" style={{ height: "50px" }}>
                            寝
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    "& > *": {
                        flexGrow: 0,
                        mr: 1,
                    },
                    "& > *:last-child": {
                        flexGrow: 1,
                        mr: 0,
                    },
                }}
            >
                <Box sx={{ flexBasis: "30%" }}>
                    <TimeSelectButton
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        submitSuccess={submitSuccess}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box>
                    <SendButton
                        handleSubmit={() => handleSubmit(new Date())}
                        isSubmitting={isSubmitting}
                        submitSuccess={submitSuccess}
                        sx={{ width: "100%" }}
                    />
                </Box>
            </Box>
            {submitError && (
                <Typography color="error">{submitError}</Typography>
            )}
        </Box>
    );
};
