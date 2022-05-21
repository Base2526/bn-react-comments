import React, { useContext, useState } from 'react'
// import styles from './Style.scss'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import ShareIcon from "@mui/icons-material/Share";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ActionContext } from './ActionContext'

const CommentStructure = ({ i, reply, parentId }) => {
  const actions = useContext(ActionContext)
  const edit = true

  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAnchorOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = (event) => {
    setAnchorEl(null);
  };

  const dialog = () =>{
    return  <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Delete Comment
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Delete your comment permanently?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  handleCloseDialog()
                  actions.onDelete(i.comId, parentId)
                }} autoFocus>
                  Delete
                </Button>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
  }

  return (
    <div className={"halfDiv"}>
      <div
        className={"userInfo"}
        style={reply && { marginLeft: 15, marginTop: '6px' }}
      >
        <div>{i.text}</div>
        <div className={"commentsTwo"}>
          <div>
            <img
              src={i.avatarUrl}
              style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
              alt='userIcon'
            />
          </div>
          <div className={"fullName"}>{i.fullName} </div>
          <div>
            <button
              className={"replyBtn"}
              onClick={() => actions.handleAction(i.comId)}
              disabled={!actions.user}
            >
              {' '}
              <FontAwesomeIcon icon={faReply} size='1x' color='#a5a5a5' /> Reply
            </button>
          </div>
        </div>
      </div>
      <div className={"userActions"}>
        {actions.userId === i.userId && actions.user && (
           <IconButton aria-label="share">
           <MoreVertIcon
             onClick={handleAnchorOpen}
           />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={
                Boolean(anchorEl)
              }
              onClose={handleAnchorClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox"
              }}
            >
              <MenuItem onClick={()=>{
                actions.handleAction(i.comId, edit)
                handleAnchorClose()
              }}>
                edit
              </MenuItem>
              <MenuItem onClick={(ev)=>{
                // actions.handleAction(i.comId, edit)
                handleClickOpenDialog(ev)
                handleAnchorClose()
              }}>
                delete
              </MenuItem>
            </Menu>
            
            {dialog()}
           </IconButton>
          // <Button variant="contained">Hello World</Button>
           /*
          <Popup
            role='tooltip'
            trigger={
              <button className={"actionsBtn"}>
                <FontAwesomeIcon icon={faEllipsisV} size='1x' color='#b9b9b9' />
              </button>
            }
            position='right center'
            nested
          >
            <div className={"actionDiv"}>
              <div>
                <button
                  className={"editBtn"}
                  onClick={() => actions.handleAction(i.comId, edit)}
                >
                  {' '}
                  edit
                </button>
              </div>
              <div>
                <Popup
                  trigger={
                    <button className={"deleteBtn"}> delete</button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className='modal' style={modal}>
                      <button
                        className='close'
                        onClick={close}
                        style={modalClose}
                      >
                        &times;
                      </button>
                      <div className='header' style={modalHeader}>
                        {' '}
                        Delete Comment{' '}
                      </div>
                      <div className='content' style={modalContent}>
                        {' '}
                        Delete your comment permanently?
                      </div>
                      <div className='actions' style={modalActions}>
                        <button
                          className='button'
                          style={modalActionBtn}
                          onClick={() => {
                            actions.onDelete(i.comId, parentId)
                            close()
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className='button'
                          style={modalDelBtn}
                          onClick={() => {
                            close()
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </Popup>
          */
        )}
      </div>
    </div>
  )
}

export default CommentStructure
