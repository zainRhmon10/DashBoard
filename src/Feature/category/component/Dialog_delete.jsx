import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export const DeleteDialogCategory = ({onclose , open , onconfirm ,loading}) => {
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
              height: '200px',
              maxWidth: '100%',
            },
          }}
        >
          <DialogTitle sx={{ fontSize: '30px' }}>Confirm Deletion</DialogTitle>
          {loading ?
          (<Box display="flex" justifyContent="center" alignItems="center">
                      <CircularProgress />
                    </Box>)
                    :
                    (
                    <>
                    <DialogContent>
            <Typography sx={{ fontSize: '22px' }}>Are you sure you want to delete this category?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onclose} color="primary">Cancel</Button>
            <Button onClick={onconfirm} color="error" variant="contained">Delete</Button>
          </DialogActions>
          </>
          )


          }
          
        </Dialog>



     );
}




