import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cities from "./Cities";
import styled from "styled-components";

const Dropdown = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
`;

export default function DropDown(props) {
  const { searchClickHandlerCallback } = props;

  //handle city name change
  const cityChangeHandler = (city) => {
    searchClickHandlerCallback(city);
  };

  return (
    <Dropdown>
      <Autocomplete
        onChange={(event, selectedValue) => cityChangeHandler(selectedValue)}
        freeSolo
        fullWidth={true}
        disablePortal
        autoComplete={true}
        autoHighlight={true}
        id="select-city-dropdown"
        options={Cities}
        sx={{ borderRadius: "30px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            fontFamily={"Patrick Hand"}
            label="Search or Select from Below"
          />
        )}
      />
    </Dropdown>
  );
}
