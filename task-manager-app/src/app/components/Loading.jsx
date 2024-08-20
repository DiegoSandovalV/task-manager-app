import CircularProgress from "@mui/material/CircularProgress"
import { Box, Typography, List } from "@mui/material"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  )
}
