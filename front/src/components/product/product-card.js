import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";

export const ProductCard = ({ videoSource, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <img src={videoSource.media} alt={videoSource.name} style={{width: "1000px", height: "500px"}}/>
      </Box>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            Camera ID: {videoSource.cameraId}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
