import { CalendarToday, Cancel, Close } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    colors,
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface CustomDateRangePickerProps {
    startDate?: Dayjs | null | string;
    endDate?: Dayjs | null | string;
    date?: Dayjs | null;
    width?: string | number;
    placeholder?: string;
    date_type?: 'single' | 'range';
    onChange?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
    LASTWEEK?: boolean;
    LASTMONTH?: boolean;
    LAST3MONTHS?: boolean;
    LAST6MONTHS?: boolean;
    LASTYEAR?: boolean;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
    startDate: initialStartDate = null,
    endDate: initialEndDate = null,
    date_type = 'range',
    width = '100%',
    placeholder = 'Select Date',
    onChange,
    LAST3MONTHS = true,
    LAST6MONTHS = true,
    LASTMONTH = true,
    LASTWEEK = true,
    LASTYEAR = true,
}) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(
        initialStartDate
            ? dayjs.isDayjs(initialStartDate)
                ? initialStartDate
                : dayjs(initialStartDate)
            : null
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        initialEndDate
            ? dayjs.isDayjs(initialEndDate)
                ? initialEndDate
                : dayjs(initialEndDate)
            : null
    );
    const [openPicker, setOpenPicker] = useState<
        'start' | 'end' | null | 'single'
    >(null);
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const formatRange = (start: Dayjs | null, end: Dayjs | null): string => {
        if (!start && !end) return '';
        if (start && !end) return `${start.format('yyyy-MM-DD')} - `;
        if (!start && end) return ` - ${end.format('yyyy-MM-DD')}`;
        return `${start?.format('DD-MM-YYYY') ?? ''} - ${end?.format('DD-MM-YYYY') ?? ''}`;
    };

    const handleDone = () => {
        if (startDate !== null && endDate !== null) {
            setOpen(false);
            setOpenPicker(null);
            console.log('Selected Range:', startDate, endDate, 'comming here');
        } else {
            setOpen(false);
            setOpenPicker(null);
            setStartDate(null);
            setEndDate(null);
            onChange && onChange(null, null);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setOpenPicker('start');
    };

    const setQuickRange = (monthsAgo: number | 'week' | 'year') => {
        const now = dayjs();

        if (monthsAgo === 'week') {
            const start = now.subtract(7, 'day').startOf('day');
            const end = now.endOf('day');
            setStartDate(start);
            setEndDate(end);
            onChange && onChange(start, end);
        } else if (monthsAgo === 'year') {
            const start = now.subtract(1, 'year').startOf('month');
            const end = now.endOf('month');
            setStartDate(start);
            setEndDate(end);
            onChange && onChange(start, end);
        } else if (typeof monthsAgo === 'number') {
            const start = now.subtract(monthsAgo, 'month').startOf('month');
            const end = now.subtract(1, 'month').endOf('month');
            setStartDate(start);
            setEndDate(end);
            onChange && onChange(start, end);
        }

        setOpen(false);
    };


    const handleClear = (e: any) => {
        e.stopPropagation();
        setStartDate(null);
        setEndDate(null);
        setOpen(false);
        setOpenPicker(null);
        onChange && onChange(null, null);
    };

    useEffect(() => {
        setStartDate(
            initialStartDate
                ? dayjs.isDayjs(initialStartDate)
                    ? initialStartDate
                    : dayjs(initialStartDate)
                : null
        );
    }, [initialStartDate]);

    useEffect(() => {
        setEndDate(
            initialEndDate
                ? dayjs.isDayjs(initialEndDate)
                    ? initialEndDate
                    : dayjs(initialEndDate)
                : null
        );
    }, [initialEndDate]);

    if (date_type === 'single') {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    onClick={() => {
                        setOpenPicker('single');
                        setOpen(true);
                    }}
                >
                    <DatePicker
                        open={openPicker === 'single'}
                        onClose={() => {
                            if (startDate) {
                                setOpenPicker(null);
                                setOpen(false);
                            }
                        }}
                        value={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setEndDate(null);
                        }}
                        slotProps={{
                            textField: {
                                label: placeholder,
                                fullWidth: true,
                                sx: { width: width },
                                size: 'small',
                                InputProps: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {startDate ? (
                                                <Close
                                                    fontSize="small"
                                                    style={{ cursor: 'pointer', color: colors.grey[500] }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setStartDate(null);
                                                        setEndDate(null);
                                                    }}
                                                />
                                            ) : (
                                                <CalendarToday fontSize="small" />
                                            )}
                                        </InputAdornment>
                                    ),
                                },
                            },
                        }}
                    />
                </Box>
            </LocalizationProvider>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <TextField
                    label="Select Date Range"
                    value={formatRange(startDate, endDate)}
                    sx={{ width: width, backgroundColor: 'white', cursor: 'pointer' }}
                    onClick={handleOpen}
                    inputRef={anchorRef}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                {startDate || endDate ? (
                                    <Close
                                        fontSize="small"
                                        style={{ cursor: 'pointer', color: colors.grey[500] }}
                                        onClick={(e) => {
                                            handleClear(e);
                                        }}
                                    />
                                ) : (
                                    <CalendarToday fontSize="small" />
                                )}
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                />
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom"
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [25, -2], 
                                },
                            },
                        ],
                    }}
                    sx={{
                        zIndex: 1500, 
                    }}
                >
                    <Paper
                        sx={{
                            p: 2,
                            mt: 1,
                            maxWidth: 400,
                            boxShadow: 8,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            display: 'flex',
                            direction: 'column',
                            gap: 2,
                            zIndex: 1500,
                        }}
                    >
                        <Stack spacing={2}>
                            <Box display="flex" gap={1} flexWrap="wrap">
                                <Cancel
                                    onClick={() => {
                                        handleDone();
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: 24,
                                        right: 16,
                                        color: colors.grey[500],
                                    }}
                                />
                                {LASTWEEK && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setQuickRange('week')}
                                    >
                                        Last Week
                                    </Button>
                                )}
                                {LASTMONTH && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setQuickRange(1)}
                                    >
                                        Last Month
                                    </Button>
                                )}
                                {LAST3MONTHS && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setQuickRange(3)}
                                    >
                                        Last 3 Months
                                    </Button>
                                )}
                                {LAST6MONTHS && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setQuickRange(6)}
                                    >
                                        Last 6 Months
                                    </Button>
                                )}
                                {LASTYEAR && (
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setQuickRange('year')}
                                    >
                                        Last Year
                                    </Button>
                                )}
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">Start Date</Typography>
                                <DatePicker
                                    open={openPicker === 'start'}
                                    onOpen={() => setOpenPicker('start')}
                                    value={startDate}
                                    sx={{ width: '100%' }}
                                    onChange={(date) => {
                                        if (date) {
                                            const newStartDate = date;
                                            setStartDate(newStartDate);
                                            setOpenPicker('end');

                                            if (endDate && newStartDate.isAfter(endDate)) {
                                                setEndDate(null);
                                            }
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps:
                                                openPicker === 'start'
                                                    ? {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setOpenPicker(null);
                                                                    }}
                                                                    size="small"
                                                                >
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }
                                                    : {},
                                        },
                                        popper: { disablePortal: true },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2">End Date</Typography>
                                <DatePicker
                                    open={openPicker === 'end'}
                                    onOpen={() => setOpenPicker('end')}
                                    value={endDate}
                                    sx={{ width: '100%' }}
                                    onChange={(date) => {
                                        if (startDate && date && date.isBefore(startDate)) {
                                            toast.error('End date cannot be before start date');
                                            return;
                                        }

                                        if (date) {
                                            setEndDate(date);
                                            const newEndDate = date;
                                            handleDone();
                                            onChange && onChange(startDate, newEndDate);
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps:
                                                openPicker === 'end'
                                                    ? {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setOpenPicker(null);
                                                                    }}
                                                                    size="small"
                                                                >
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }
                                                    : {},
                                        },
                                        popper: { disablePortal: true },
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Paper>
                </Popper>
            </Box>
        </LocalizationProvider>
    );
};

export default CustomDateRangePicker;
