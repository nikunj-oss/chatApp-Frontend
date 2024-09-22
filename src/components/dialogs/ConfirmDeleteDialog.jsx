/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const ConfirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Confirm Delete
        </DialogTitle>
        <DialogContent>
           <DialogContentText>
               Are you sure you want to delete this group?
           </DialogContentText>
           <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteHandler} color="error">Delete</Button>
           </DialogActions>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeleteDialog