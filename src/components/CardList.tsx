import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { COLOR_STATUS, COLOR_TEXT_STATUS } from '../constant/color';
import { CardTask } from './CardTask';
import { TodoContext } from './TodoContext';


export default function CardList(props: any) {
    const { changeShowDialogForm, handleSetValueDefaultForm } = useContext(TodoContext);
    const { col, handleUpdateStatusTask } = props;
    const [show, setShow] = useState<boolean>(false);

    const handleShowAddTask = (status: string) => {
        handleSetValueDefaultForm({ status });
        changeShowDialogForm(true);
    }


    const dragStart = (event: any) => {
        if (event.target.className.includes('card')) {
            event.target.classList.add('dragging')
        }
    }

    const handleDragEnd = (event: any) => {
        if (event.target.className.includes('card')) {
            event.target.classList.remove('dragging')
        }
    }

    const handleDragOverWrapper = (event: any) => {
        event.preventDefault();
        setShow(event.currentTarget.dataset.column == col?.id);
    };

    const handleDragLeaveWrapper = () => {
        setShow(false);
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedItem = event.dataTransfer.getData('data');
        setShow(false);
        handleUpdateStatusTask && handleUpdateStatusTask(JSON.parse(droppedItem), col.id);
    };

    useEffect(() => {
        document.addEventListener('dragstart', dragStart)
        document.addEventListener('dragend', handleDragEnd)
        return () => {
            document.removeEventListener('dragstart', dragStart)
            document.removeEventListener('dragend', handleDragEnd)
        }
    }, [])
    return (
        <div
            data-column={col?.id}
            onDragOver={handleDragOverWrapper}
            onDragLeave={handleDragLeaveWrapper}
            style={{ height: '100%' }}
        >
            <Box className="card-list-header">
                <Box className="d-flex justify-content-start align-items-center" >
                    <Box className="card-list-header-color" style={{ backgroundColor: COLOR_STATUS[col?.id] }}></Box>
                    <Box className="card-list-header-text" style={{ color: COLOR_TEXT_STATUS[col?.id] }}>{col?.title}</Box>
                </Box>
                <Box className="card-list-header-icon"><AddOutlinedIcon style={{ paddingTop: '5px', cursor: 'pointer', color: COLOR_TEXT_STATUS[col?.id] }} onClick={() => handleShowAddTask(col?.id)} /></Box>
            </Box>

            <Box className="card-list-body" data-column={col?.id}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}>
                {col?.list?.map((item: any, index: any) => (< CardTask data={item} key={item?.id} index={index} data-id={item.id} />))}
                {show && <Box className="card-temp-drop"></Box>}
            </Box>
        </div>
    );
}
