import { Autocomplete, Box, IconButton, Paper, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getBoardings } from '../../services/boarding'
import Map from './Map'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'
import { haversine_distance } from './GeoDecoder'

const genderList = {
    name: "Gender",
    value: "gender",
    list: [
        { name: "All Genders", key: "gender", value: undefined },
        { name: "Male", key: "gender", value: "male" },
        { name: "Female", key: "gender", value: "female" },
    ]
}

const AvaialbleList = {
    name: "Available",
    value: "available",
    list: [
        { name: "All Availablity", key: "available", value: undefined },
        { name: "Available", key: "available", value: 'true' },
        { name: "Unavailable", key: "available", value: 'false' },
    ]
}

const TypeList = {
    name: "Type",
    value: "roomType",
    list: [
        { name: "All Types", key: "roomType", value: undefined },
        { name: "Single", key: "roomType", value: "single" },
        { name: "Share", key: "roomType", value: "share" },
    ]
}

const list = [genderList, AvaialbleList, TypeList]

const Filter = ({ setBoardings }) => {

    const map = useSelector(state => state.map.position)

    const [mapRange, setMapRange] = useState(300)
    const [mapFilter, setMapFilter] = useState(false)
    const [filters, setFilters] = useState([
        { gender: undefined },
        { available: undefined },
        { roomType: undefined },
    ])


    const handleMap = async () => {
        if (!map) return
        var { data: { boarding }, status } = await getBoardings()
        if (status !== 200) {
            setBoardings([])
            return
        }
        const filtered = []
        boarding.forEach(b => {
            const d = haversine_distance({ lat: b.geoLocation[1], lng: b.geoLocation[0] }, map)
            const diff = Math.abs(Number.parseFloat(mapRange) - Number.parseFloat(d))
            console.log(diff);
                filtered.push(b)
        })
        setBoardings(filtered)
    }

    const handleACChange = async (e, v) => {
        let temp = [...filters]
        temp = temp.map(t => {
            if (v.key === Object.keys(t)[0])
                if (v.value) t[v.key] = v.value
                else t[v.key] = v.value
            return t
        })
        setFilters(temp)

        temp = temp.filter(t => Object.values(t)[0])
        let searchQuery = ''
        for (const query of temp) {
            searchQuery += `${Object.keys(query)[0]}=${Object.values(query)[0]}&`
        }
        searchQuery = searchQuery.substring(0, searchQuery.length - 1)
        console.log(searchQuery);

        var { data: { boarding }, status } = await getBoardings(searchQuery)
        console.log(status);
        if (status !== 200) {
            setBoardings([])
            return
        }
        setBoardings(boarding)
    }

    return (
        <Box width={300} bgcolor="#eee" height="80vh" borderRadius={5} mr={5} border="1px solid #b4b4b4">
            <Typography fontSize={22} textAlign="center" fontWeight={700} sx={{ mt: 4, mb: 2 }}>Filter</Typography>
            {list.map((data, i) => (
                <Autocomplete
                    key={i}
                    size='small'
                    options={data.list}
                    onChange={handleACChange}
                    disableClearable={true}
                    getOptionLabel={option => option.name}
                    PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                    sx={autocompleteStyle}
                    renderInput={(params) => (
                        < TextField
                            {...params}
                            name={data.value}
                            placeholder={data.name}
                            inputProps={{ ...params.inputProps, readOnly: true }}
                            sx={{ minWidth: 200, }}
                        />
                    )}
                />
            ))}

            {mapFilter ? (
                <Box display="flex" flexDirection="column" justifyContent="center" mx={1}>
                    <Map circle={true} marker={false} drag={true} sx={mapStyle} mapRange={Number.parseInt(mapRange)} />
                    <Box display="flex" alignItems="center">
                        <Switch onChange={(e, v) => setMapFilter(v)} checked={mapFilter} />
                        <TextField
                            variant="outlined"
                            size='small'
                            type="number"
                            disabled={!mapFilter}
                            onChange={e => setMapRange(e.target.value)}
                            placeholder="Range in Meters"
                            name="mapRange"
                            sx={style_txtbox}
                        />
                        <IconButton onClick={handleMap}><SearchIcon /></IconButton>
                    </Box>
                </Box>) : (
                <Box display="flex" alignItems="center" mx={2}>
                    <Typography fontSize={16} fontWeight={500}>Map search </Typography>
                    <Switch onChange={(e, v) => setMapFilter(v)} checked={mapFilter} />
                </Box>
            )}

        </Box>
    )
}

export default Filter

const mapStyle = {
    width: "100%",
    boxShadow: 0,
}

const autocompleteStyle = {
    width: "100%",
    p: 1,
    ".MuiOutlinedInput-root": {
        bgcolor: "white",
        borderRadius: "100px !important"
    }
}

const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}

const style_txtbox = {
    width: "100%",
    p: 1,
    ".MuiOutlinedInput-root": {
        bgcolor: "white",
        borderRadius: 10
    }
}
