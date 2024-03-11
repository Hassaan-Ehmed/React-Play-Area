import LanguageIcon from '@mui/icons-material/Language';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import TourIcon from '@mui/icons-material/Tour';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


export default function MUIList({name,capital,currency,population,languages}:any) {
  return (
    <List sx={{  bgcolor: 'background.paper' }}>
      <ListItem >
        <ListItemAvatar>
          <Avatar sx={{bgcolor:"purple"}}>
            <PublicIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Country Name" secondary={name ?? ''} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{bgcolor:"green"}}>
   <TourIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Country Capital" secondary={capital ?? ''} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{bgcolor:"#F6D704"}}>
            <PaidIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Currency" secondary={currency ?? ''} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{bgcolor:"red"}}>
          <PeopleAltIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total Population" secondary={population ?? ''} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{bgcolor:"black"}}>
          <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Languages" secondary={languages ?? ''} />
      </ListItem>
    </List>
  );
}