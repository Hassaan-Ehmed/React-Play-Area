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
import { TextField } from '@mui/material';
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
  sort((a:any, b:any) => a.name.localeCompare(b.name));
  
  const flagS = useReactCountries?.useCountries()
  console.log("FLAGS",flagS);
  
      const [open, setOpen] = React.useState(false);
  const [input,setInput] = React.useState<string>("");
  const [allCountries,setAllCountries] = React.useState(originalArr);
  const [showCountryDetails,setShowCountryDetails] = React.useState<boolean>(false);
  const [detailPacket,setDetailPacket] = React.useState<any>({})
  
  React.useEffect(()=>{

    if(input.trim() === ""){

      setAllCountries(originalArr);

    }else{
        
      const filteredCountries = originalArr.filter((country:any)=>

        country.name.toLowerCase().includes(input.toLowerCase())
        

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
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
      
        <DialogContent dividers>

{showCountryDetails  ?  detailPacket && (

<MUICard detailPacket={detailPacket}/>

) :  

allCountries.map((country:any,idx:number)=>(


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
  
  </Typography>

))
        
  }
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}