import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MUIList from './MUIList';

export default function MUICard({detailPacket}:any) {
  return (
    <Card sx={{ width:"300px" }} elevation={4}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={detailPacket.flags.png}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {detailPacket?.name}
          </Typography>
         

        <MUIList  name={detailPacket.name} capital={detailPacket.capital} currency={`${detailPacket.currencies[0].name} ${detailPacket.currencies[0].symbol}` } population={detailPacket.population} languages={detailPacket.languages.join(" ")}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}