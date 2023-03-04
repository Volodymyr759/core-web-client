import { Box, Button } from "@mui/material";
import { LoadMoreButtonProps } from "./types";

export default function LoadMoreButton({ isDisabled, onClickHandler, children }: LoadMoreButtonProps): JSX.Element {
    return (
        <Box mt={3} mb={3} textAlign="center">
            <Button
                onClick={onClickHandler}
                variant="outlined"
                disabled={isDisabled}>
                {children}
            </Button>
        </Box>
    )
}