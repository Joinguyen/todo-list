
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/joy/LinearProgress';
import { Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { COLOR_STATUS, COLOR_TAG, COLOR_TEXT_STATUS } from '../constant/color';
import { PRIORITY, STATUS_PERCENT, TAGS } from '../constant/default';
import { IconPriority } from './IconPriority';
import { TodoContext } from './TodoContext';


export const CardTask: FC = (props: any) => {
    const { updateTask, deleteTask, changeShowDialogForm, handleSetValueDefaultForm } = useContext(TodoContext);
    const [open, setOpen] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { data } = props;
    const NUMBER_MAX = 80;

    const handleChange = (event: SelectChangeEvent) => {
        const task = { ...data, priority: event.target.value };
        updateTask(task, data);
        toast.success("Update task success!");
    };

    const handleClickChangeShow = (event: any) => {
        event.preventDefault();
        setShowMore((prev) => !prev);
    };

    const handleDragStart = (event: any) => {
        event.dataTransfer.setData('text/plain', data?.id);
        event.dataTransfer.setData('id', data?.id);
        event.dataTransfer.setData('status', data?.status);
        event.dataTransfer.setData('data', JSON.stringify(data));
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDialogDelete = () => {
        setOpen(false);
    };

    const handleShowDelete = () => {
        setOpen(true);
        handleClose();
    }
    const handleShowEdit = () => {
        handleSetValueDefaultForm(data);
        changeShowDialogForm(true);
        handleClose();
    }

    const handleDelete = () => {
        deleteTask(data);
        setOpen(false);
        toast.success("Delete task success!");
    }

    return (
        <div className="card" draggable="true" onDragStart={handleDragStart} data-col={data?.status}>
            <Card className="card-inner">
                <Box className="card-task" >
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box className="select-status-warper">
                            <IconPriority priority={data.priority} />
                            <Select
                                value={data?.priority}
                                label=""
                                onChange={handleChange}
                                className="select-status"
                                name="priority"
                            >
                                {Object.entries(PRIORITY).map(([key, value]) => (
                                    <MenuItem key={key} value={key}>{value}</MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box style={{
                            borderBottomLeftRadius: '90%',
                            backgroundColor: COLOR_STATUS[data?.status],
                        }}
                        >
                            <IconButton aria-label="settings"
                                id="basic-button"
                                aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ color: COLOR_TEXT_STATUS[data?.status] }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleShowEdit} style={{ color: '#070A52' }}><DriveFileRenameOutlineIcon style={{ marginRight: '5px' }} />Edit</MenuItem>
                            <MenuItem onClick={handleShowDelete} style={{ color: '#D21312' }}><DeleteSweepIcon style={{ marginRight: '5px' }} />Delete</MenuItem>
                        </Menu>
                    </Box>
                    <Typography component="div" style={{ padding: '10px', fontWeight: 'bold', color: COLOR_TEXT_STATUS[data?.status] }}>
                        {data.title}
                    </Typography>
                    <Typography variant="body2" style={{ padding: '0px 10px 10px', color: COLOR_TEXT_STATUS[data?.status] }}>
                        {showMore ? (<>{data.description}{String(data.description).split('')?.length > NUMBER_MAX ? <span className="icon-show-text" onClick={handleClickChangeShow}>less</span> : <></>}</>) : (<>{String(data.description).substring(0, NUMBER_MAX)}{String(data.description).split('')?.length > NUMBER_MAX ? (<>...<span className="icon-show-text" onClick={handleClickChangeShow}>more</span></>) : <></>}</>)}
                    </Typography>
                    <Box style={{ padding: '10px' }}>
                        <Stack spacing={1} alignItems="flex-start">
                            <Stack direction="row" spacing={1}>
                                {data?.tags?.map((value: string) => (
                                    <Chip label={TAGS[value]} key={value} size="small" color='primary' style={{ backgroundColor: COLOR_TAG[value] }} />
                                ))}
                            </Stack>
                        </Stack>
                    </Box>
                    <Box style={{ marginBottom: '1px' }}>
                        <LinearProgress thickness={1} style={{ color: COLOR_STATUS[data?.status] }} variant="plain" determinate value={STATUS_PERCENT[data?.status]} />
                    </Box>
                </Box>
            </Card>
            <Dialog
                open={open}
                onClose={handleCloseDialogDelete}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Confirm delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialogDelete}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};