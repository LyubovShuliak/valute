import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type Props = {
  courses: string[][];
};

const CorsesTable: FC<Props> = ({ courses }) => {
  return (
    <Box sx={{ width: "500px" }}>
      {courses.map((currency: string[]) => {
        return (
          <Grid container spacing={1} sx={{ margin: "3px" }} key={currency[0]}>
            <Grid item xs={2} sx={{ margin: "3px", width: "300px" }}>
              <Item sx={{ margin: "3px", backgroundColor: "cadetblue" }}>
                {currency[0]}
              </Item>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ margin: "3px", alignItems: "start" }}
            
            >
              <Item
                sx={{
                  margin: "3px",
                  textAlign: "left",
                  paddingLeft: "60px",
                }}
              >
                {currency[1]}
              </Item>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};
export default CorsesTable;
