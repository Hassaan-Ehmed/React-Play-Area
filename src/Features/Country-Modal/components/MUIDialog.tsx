import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import MUICard from './MUICard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const useReactCountries = require('use-react-countries');
const {useCountries} = require('use-react-countries');





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    width:"300px"
  },
}));

export default function MUIDialog() {

  const originalArr = useReactCountries?.useCountries()?.countries.
  sort((a:any, b:any) => {
    
    // a.name.localeCompare(b.name))

    const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  
  return 0;

  });
  
  let currentLetter = '';
  
      const [open, setOpen] = React.useState(false);
  const [input,setInput] = React.useState<string>("");
  const [allCountries,setAllCountries] = React.useState(originalArr);
  const [showCountryDetails,setShowCountryDetails] = React.useState<boolean>(false);
  const [detailPacket,setDetailPacket] = React.useState<any>({})
  
  React.useEffect(()=>{

    if(input.trim() === ""){

      setAllCountries(originalArr);

    }else{
        
      const filteredCountries = originalArr.filter((country:any)=>{
        
        if( (country.name.toLowerCase().includes(input.toLowerCase())) || (country.emoji.toLowerCase().includes(input.toLowerCase())) || (country.countryCallingCode.toLowerCase().includes(input.toLowerCase()))){
          return true
        }else{
      return    false
        }

      }

    
      );

      setAllCountries(filteredCountries);
    }


  },[input,allCountries]);
  
  console.log(input)
  
  const handleClickOpen = () => {
    setOpen(true);
    setAllCountries(originalArr);
    setDetailPacket({});
    setShowCountryDetails(false);
    
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleInput=(event:any)=>{

try{

setInput(event.target.value);

}catch(error){
    console.log("Error in handleInput function() ");
}

  }

console.log("Original",originalArr);
// console.log("Sorted",);

const handleCountryClick=(clickedCountry:any)=>{

  console.log("Country Name",clickedCountry.name);
  console.log("Country Code",clickedCountry.countryCallingCode);

  setShowCountryDetails(true);
  setDetailPacket(clickedCountry);

}

console.log(detailPacket);

const handleBackToCountries=()=>{

  setShowCountryDetails(false);
  setDetailPacket({});
  setAllCountries(originalArr);
  setInput("")

}


return (
    <React.Fragment>
      <center>

          <h1>  Hello Country Code Modal! </h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Country
      </Button>

      </center>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        
        
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
       
       {showCountryDetails ?   
       
       <Button 
       variant="contained" 
       onClick={handleBackToCountries}
       >
        <ArrowBackIcon/>
        &nbsp; Back
        </Button> : (
        
        <TextField
          id="standard-search"
          label="Search Country"
          type="text"
          variant="standard"
          fullWidth
          onChange={handleInput}
        />

        )}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      
        <DialogContent dividers sx={{width:360}}>

{showCountryDetails  ?  detailPacket && (

<MUICard detailPacket={detailPacket}/>

) :  

allCountries.map((country:any,idx:number)=>{
  

    const firstLetter = country.name.charAt(0).toUpperCase();

    let label = null;

    // Render label if the first letter of the country name changes
    if (firstLetter !== currentLetter ) {
   
      currentLetter = firstLetter;
      
      label = <ListItem sx={{backgroundColor:"rgba(51,102,192,0.3)"}}>
                 
     <ListItemText primary={<strong>{firstLetter}</strong>} />
     
     </ListItem>
   }


  return <>
  
  
  {label}
  
  <Typography gutterBottom 

sx={{
  
  cursor:'pointer',
  display:"flex", 
  justifyContent:"space-between",
  alignItems:"center",
  border:"1px soild red",
  padding:'5px'
  
}}


onClick={()=>handleCountryClick(country)}
>

  <div style={{ 
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:"5px",paddingRight:"5px"}} ><img src={country.flags.png}  style={{height:"20px",width:"20px",aspectRatio:"3/2",objectFit:"contain",marginRight:"10px",boxShadow:"0px 0px 0px 0px black"}} /> {country.name}</div><span>{country.countryCallingCode == "" ? 'N/A' : country.countryCallingCode} </span>
  
  
  </Typography></>
   
  
  }
)
}  


        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}