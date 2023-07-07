
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Remove';
import { COLOR_PRIORITY } from '../constant/color';

interface PropsType { priority: string };

export const IconPriority = (props: PropsType) => {
    const { priority = '' } = props;
    switch (priority) {
        case 'low':
            return (<ArrowDownwardIcon style={{ color: COLOR_PRIORITY[priority], marginRight: '5px' }} />)
        case 'medium':
            return (<RemoveIcon style={{ color: COLOR_PRIORITY[priority], marginRight: '5px' }} />)
        case 'high':
            return (<ArrowUpwardIcon style={{ color: COLOR_PRIORITY[priority], marginRight: '5px' }} />)
        default:
            return <></>
    }
};