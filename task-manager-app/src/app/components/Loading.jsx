import CircularProgress from "@mui/material/CircularProgress"
import { Box, Typography, List } from "@mui/material"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "94vh",
        p: 2,
      }}
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 3,
          boxShadow: 5,
          maxWidth: 600,
          width: "100%",
          minHeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          backgroundColor: "white",
        }}
      >
        <CircularProgress />
        <Typography variant="h4" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  )
}
