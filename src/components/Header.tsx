
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/joy/Typography';
import { Box, Grid, IconButton, IconButtonProps } from "@mui/material";
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { FC, useContext } from 'react';
import { COLOR_PRIORITY, COLOR_STATUS, COLOR_TAG } from '../constant/color';
import { PRIORITY, STATUS, TAGS } from '../constant/default';
import Form from './Form';
import { TodoContext } from "./TodoContext";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Header: FC = () => {
  const { isShowDialogForm, changeShowDialogForm } = useContext(TodoContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    changeShowDialogForm(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <Grid container>
        <Typography level="h2" fontSize="xl" style={{ color: '#4A55A2', lineHeight: '2.25rem' }} >TODO LIST</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon style={{ color: '#4a55a2' }} />
        </ExpandMore>
        <Grid item xs={12} md={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit >
            <Grid container className='header-inner'>
              <Grid item xs={3} sm={2} md={1} className="mb-1" >
                <Typography style={{ color: '#4a55a2' }}>Priority</Typography>
              </Grid>
              <Grid item xs={9} sm={10} md={11} className="mb-1">
                <Stack spacing={1} alignItems="flex-start" >
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {Object.entries(PRIORITY).map(([key, value]) => (
                      <Chip label={value} key={key} size="small" color='primary' style={{ backgroundColor: COLOR_PRIORITY[key], marginBottom: '5px' }} />
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={3} sm={2} md={1} className="mb-1" >
                <Typography style={{ color: '#4a55a2' }}>Status</Typography>
              </Grid>
              <Grid item xs={9} sm={10} md={11} className="mb-1">
                <Stack spacing={1} alignItems="flex-start" >
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {Object.entries(STATUS).map(([key, value]) => (
                      <Chip label={value} key={key} size="small" color='primary' style={{ backgroundColor: COLOR_STATUS[key], marginBottom: '5px' }} />
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={3} sm={2} md={1} className="mb-1" >
                <Typography style={{ color: '#4a55a2' }}>Tag</Typography>
              </Grid>
              <Grid item xs={9} sm={10} md={11} className="mb-1">
                <Stack spacing={1} alignItems="flex-start" >
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {Object.entries(TAGS).map(([key, value]) => (
                      <Chip label={value} key={key} size="small" color='primary' style={{ backgroundColor: COLOR_TAG[key], marginBottom: '5px' }} />
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Dialog open={isShowDialogForm} onClose={handleClose}>
          <DialogTitle>Form Task</DialogTitle>
          <DialogContent>
            <Form />
          </DialogContent>
        </Dialog>
      </Grid>
    </Box >
  );
}