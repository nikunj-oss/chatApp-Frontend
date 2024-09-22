import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material"
import {useInputValidation} from "6pp"
import { Search as SearchIcon } from "@mui/icons-material"
import UserItem from "../shared/UserItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsSearch } from "../../redux/reducers/misc"
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api"
import { useAsyncMutation } from "../../hooks/hook"

const Search = () => {

  const {isSearch} = useSelector(state => state.misc)

  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFriendRequest]=useAsyncMutation(useSendFriendRequestMutation)

  const search = useInputValidation("");

  const dispatch = useDispatch()

  const [users, setUsers] = useState([])
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request.....",{userId:id})
  }

  const searchCloseHandler = () => dispatch(setIsSearch(false))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data.users)
        })
        .catch((err) => {
          console.log(err)
        })
    }, 1000);

    return () => {
      clearTimeout(timeOutId)
    }

  }, [search.value])

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      fullWidth={true}  // Ensures the dialog takes full width on small screens
      maxWidth="xs"     // Restricts the max width of the dialog
      sx={{
        '& .MuiDialog-paper': {
          overflowY: 'auto', // Allows scroll if content overflows
        }
      }}
    >
      <Stack p={"2rem"} direction={"column"} width={"100%"} sx={{ boxSizing: "border-box" }}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField 
          label="Name" 
          value={search.value} 
          onChange={search.changeHandler} 
          variant="outlined" 
          size="small" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }} 
        />

        <List>
          {
            users.map((user) => (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search
