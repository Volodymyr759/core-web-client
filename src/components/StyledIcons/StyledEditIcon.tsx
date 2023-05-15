import { IStyledEditIconProps } from './types';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function StyledEditIcon({ tooltipTitle, onEdit }: IStyledEditIconProps): JSX.Element {
    return (
        <Tooltip title={tooltipTitle} placement="top">
            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#5F7C78' }} onClick={onEdit} />
        </Tooltip>
    )
}