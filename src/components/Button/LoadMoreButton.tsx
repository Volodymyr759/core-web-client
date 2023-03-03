import { Box, Button } from "@mui/material";
import { LoadMoreButtonProps } from "./types";

export default function LoadMoreButton({ isDisabled, onClickHandler, children }: LoadMoreButtonProps): JSX.Element {
    return (
        <Box mt={5} sx={{ textAlign: 'center' }}>
            <Button
                onClick={onClickHandler}
                variant="outlined"
                disabled={isDisabled}>
                {children}
            </Button>
        </Box>
    )
}