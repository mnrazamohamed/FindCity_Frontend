import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BoardingCard from "../components/BoardingCard"
import Filter from "../components/boardingDetails/Filter"
import { getBoardings } from "../services/boarding"


const Boarding = () => {
  const [boardings, setBoardings] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    (async () => {
      const { data: { boarding }, status } = await getBoardings()
      if (status !== 200) {
        setLoading(false)
        return
      }
      setBoardings(boarding.filter(b => b.approval))
      setLoading(false)
    })()
    // eslint-disable-next-line
  }, [auth.role])

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width="100%">
      <Typography variant="h5" fontWeight={900}>Loading...</Typography>
    </Box>
  )

  return (
    <Box my={5} ml={8} display="flex" width="100%">
      <Filter setBoardings={setBoardings} />
      {
        (!loading && boardings.length === 0) ? (
          <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width="calc( 100% - 340px )">
            <Typography variant="h5" fontWeight={900}>No boardings found :(</Typography>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" >
            {boardings.map((card, index) => <BoardingCard key={index} {...card} />)}
          </Box>
        )
      }
    </Box>

  )
}

export default Boarding