import { AddShoppingCartOutlined } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    colors,
    FormControl,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { GetMenuItemListApi } from '../AllGetApi';
import { useDispatch } from 'react-redux';
import { setData } from '../AllStoreSlice/AddQuantitySlice';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { setAddProduct } from '../AllStoreSlice/AddProductCanteenSlice';

const AllProductCard = ({ canteenId }: { canteenId: string }) => {
    const [Search, setSearch] = useState<string>('');
    const [Category, setCategory] = useState<string>('ALL');

    const { data, isLoading } = GetMenuItemListApi({
        canteen_id: canteenId,
    });
    const dispatch = useDispatch();
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    }


    const filteredItems =
        data?.menuitems?.filter((item) => {
            const filterSearch = item?.name?.toLowerCase()?.includes(Search.toLowerCase())
            const filterCategory = Category === "ALL" || item?.category === Category
            return filterSearch && filterCategory
        }) || []


    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    bgcolor: 'white',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" mt={8}>
                    <TextField
                        size="small"
                        label="Search"
                        variant="filled"
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: 'white',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <FormControl sx={{ minWidth: 150, }}
                        variant='outlined'
                    >
                        <Select
                            sx={{
                                bgcolor: colors.grey[50],
                            }}
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Category}
                            label="Category"
                            onChange={(event: any) => handleCategoryChange(event)}
                        >
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="SNACKS">Snacks</MenuItem>
                            <MenuItem value="MEALS">Meals</MenuItem>
                            <MenuItem value="BEVERAGES">Beverages</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: colors.grey[50],
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: colors.red[400],
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: colors.grey[600],
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: colors.grey[200],
                    },
                    p: 1
                }}
            >
                {isLoading ? (
                    <Typography
                        variant="h6"
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            height: '50%',
                            width: '100%',
                            marginTop: '10%',
                        }}
                    >
                        <CircularProgress size={60} />
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                            gap: 1,
                        }}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        bgcolor: colors.orange[100],
                                        boxShadow: 'none',
                                        maxHeight: '250px',
                                        minHeight: '250px',
                                        // maxWidth: '170px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // minWidth: '170px',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="50%"
                                        image={`${data?.base_url}${item?.image_url}`}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: colors.grey[800],
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            sx={{
                                                color: 'green',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span>&#8377;{item.price}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActionArea>
                                        <Stack
                                            direction="row"
                                            onClick={() => dispatch(setData(item))}
                                            sx={{
                                                bgcolor: colors.red[400],
                                                cursor: 'pointer',
                                                padding: '10px',
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    margin: 'auto',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <span style={{ color: 'white' }}>Add To Cart</span>
                                                <AddShoppingCartOutlined sx={{ color: 'white' }} />
                                            </Typography>
                                        </Stack>
                                    </CardActionArea>
                                </Card>
                            ))
                        ) : filteredItems.length === 0 || Search ? (
                            <Stack
                                direction="row"
                                sx={{
                                    width: '70vw',
                                    height: '70vh',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: colors.grey[600],
                                        textAlign: 'center',
                                        bgcolor: colors.grey[200],
                                        p: 2,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => dispatch(setAddProduct(canteenId))}
                                >
                                    <AddIcon
                                        sx={{
                                            fontSize: '80px',
                                            color: colors.grey[600],
                                            height: '50px',
                                        }}
                                    />
                                </Typography>
                            </Stack>
                        ) : null}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AllProductCard;
