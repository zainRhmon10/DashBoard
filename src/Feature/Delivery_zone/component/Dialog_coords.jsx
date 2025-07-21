import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

export const DialolgCoords =({data , open ,onclose}) =>{

    return(
 <Dialog
          open={open}
          onClose={onclose}
          fullWidth
          maxWidth={false}
          sx={{
            '& .MuiDialog-paper': {
              width: {
                xs: '90vw',
                sm: '80vw',
                md: '600px',
                lg: '600px',
                xl: '600px',
              },
              height: '50%',
              maxWidth: '100%',
            },
          }}
        >
          <DialogTitle sx={{
            color :'green', 
            fontSize:'25px',
            boxShadow : 3
          }}>Coordinates</DialogTitle>
        <DialogContent>
          <List>
            {data.map((c, i) => (
              <ListItem key={i}>
                <ListItemText primary={`point(${i+1}) : Lat: ${c.lat} , Lng: ${c.lng}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions
        sx={{boxShadow:3}}
        >
          <Button onClick={onclose} color="primary" sx={{fontSize:'15px'}}>
            cancel
          </Button>

        </DialogActions>
          
        </Dialog>



    );


}