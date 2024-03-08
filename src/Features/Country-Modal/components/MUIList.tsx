import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PublicIcon from '@mui/icons-material/Public';
import TourIcon from '@mui/icons-material/Tour';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LanguageIcon from '@mui/icons-material/Language';


export default function MUIList({name,capital,currency,population,languages}:any) {
  return (
    <List sx={{  bgcolor: 'background.paper' }}>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <PublicIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Country Name" secondary={name} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
   <TourIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Country Capital" secondary={capital} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PaidIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Currency" secondary={currency} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <PeopleAltIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total Population" secondary={population} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Languages" secondary={languages} />
      </ListItem>
    </List>
  );
}