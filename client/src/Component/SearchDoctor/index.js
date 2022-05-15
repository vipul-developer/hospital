import * as React from 'react';
import { Paper,InputBase,InputAdornment,Divider } from "@mui/material";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
const SearchDoctor = () => {
    const [ searchData,setSearchData ] = React.useState({
        findLocation:"",
        findDoctor:""
    });
    const handleChange = React.useCallback((event,filed) => {
        console.log(event.target.value)
        setSearchData({ ...searchData, [filed]:event.target.value});
    },[searchData])

    return (
        <>
            <Paper 
                component="form" 
                autoComplete='off'
                sx={{p:'5px 4px',display:'flex',alignItems:'center'}}
                variant="outlined"
                square
            >
                <InputBase
                    id="location"
                    name="findLocation"
                    value={searchData.findLocation || ""}
                    type="search"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Location"
                    endAdornment={<InputAdornment position='start'><LocationOnSharpIcon color="primary"/></InputAdornment>}
                    inputProps={{ "aria-label": "location" }}
                    onChange={(event) => handleChange(event,"findLocation")}
                    
                />
                <Divider sx={{ height:"28px !important", m: 0.5 }} orientation="vertical" />
                <InputBase
                    id="doctor"
                    name="findDoctor"
                    value={searchData.findDoctor || ""}
                    type="search"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search doctor,clinics,hospitals,etc."
                    endAdornment={<InputAdornment position='start'><SearchSharpIcon color="primary"/></InputAdornment>}
                    inputProps={{ "aria-label": "doctor" }}
                    onChange={(event) => handleChange(event,"findDoctor")}
                />
            </Paper>
        </>
    );
};

export default SearchDoctor;