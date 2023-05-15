import { IStyledDeleteIconProps } from './types';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StyledDeleteIcon({ tooltipTitle, onDelete }: IStyledDeleteIconProps): JSX.Element {
    return (
        <Tooltip title={tooltipTitle} placement="top">
            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#5F7C78' }} onClick={onDelete} />
        </Tooltip>
    )
}
