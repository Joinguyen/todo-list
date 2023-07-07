import { Box, Checkbox, Chip, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { FC, useContext } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Task } from '../Model/Task';
import { COLOR_TAG, COLOR_TEXT_PRIORITY, COLOR_TEXT_STATUS } from '../constant/color';
import { PRIORITY, STATUS, TAGS } from '../constant/default';
import { TodoContext } from './TodoContext';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    status: yup.string().required('Description is required'),
    priority: yup.string().required('Description is required'),
    tags: yup.array().of(yup.string()),
});

const Form: FC = () => {
    const { addTask, updateTask, valueDefaultForm, changeShowDialogForm } = useContext(TodoContext);
    const formik = useFormik({
        initialValues: {
            title: valueDefaultForm?.title || '',
            description: valueDefaultForm?.description || '',
            status: valueDefaultForm?.status || Object.keys(STATUS)[0],
            priority: valueDefaultForm?.priority || Object.keys(PRIORITY)[0],
            tags: valueDefaultForm?.tags || [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (valueDefaultForm?.id) {
                const input: any = { ...valueDefaultForm, ...values };
                updateTask(input, valueDefaultForm as Task);
                toast.success("Update task success!");
            } else {
                const id = String(new Date().valueOf());
                const input: any = { ...values, id };
                addTask(input);
                toast.success("Create task success!");
            }
            changeShowDialogForm(false);
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title*"
                    size="small"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description*"
                    size="small"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                />
                <FormControl style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                    >
                        {Object.entries(STATUS).map(([key, value]) => (
                            <FormControlLabel key={key} value={key} style={{ color: '#0009' }} control={<Radio sx={{
                                '&, &.Mui-checked': {
                                    color: COLOR_TEXT_STATUS[key],
                                },
                            }} />} label={value} />
                        ))}
                    </RadioGroup>
                </FormControl>
                <FormControl style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="priority"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                    >
                        {Object.entries(PRIORITY).map(([key, value]) => (
                            <FormControlLabel key={key} value={key} style={{ color: '#0009' }} control={<Radio sx={{
                                '&, &.Mui-checked': {
                                    color: COLOR_TEXT_PRIORITY[key],
                                },
                            }} />} label={value} />
                        ))}
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ width: '100%' }} style={{ marginTop: '10px', marginBottom: '30px' }}>
                    <InputLabel id="multiple-tag-label">Tags</InputLabel>
                    <Select
                        labelId="multiple-tag-label"
                        id="multiple-tag"
                        multiple
                        name="tags"
                        variant="standard"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        input={<OutlinedInput id="select-multiple-tag" fullWidth label="Tags" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected?.map((value: any) => (
                                    <Chip key={value} label={TAGS[value]} size="small" color='primary' style={{ backgroundColor: COLOR_TAG[value] }} />
                                ))}
                            </Box>
                        )}
                    >
                        {Object.entries(TAGS).map(([key, value]) => (
                            <MenuItem
                                key={key}
                                value={key}
                            >
                                <Checkbox checked={(formik.values.tags || []).indexOf(key) > -1} />
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button color="error" variant="contained" fullWidth sx={{
                    borderColor: '#5A96E3', backgroundColor: '#5A96E3', color: '#FFF', ":hover": {
                        borderColor: '#0A6EBD',
                        color: '#FFF',
                        backgroundColor: '#0A6EBD',
                    }
                }} type="submit">
                    {valueDefaultForm?.id ? 'Update' : 'Create'}
                </Button>
            </form>
        </div>
    );
};
export default Form;
