import Button from "@mui/material/Button";

type Props = {
    onClick: () => void;
    lines: string[];
};

export const MenuItem: React.FC<Props> = ({ onClick, lines }) => {
    return (
        <Button
            onClick={() => onClick()}
            variant="contained"
            fullWidth
            sx={{
                height: "10vh",
                fontSize: "3vh",
                padding: "1vh 2vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "& div": {
                    lineHeight: "1.2",
                },
            }}
        >
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </Button>
    );
};
