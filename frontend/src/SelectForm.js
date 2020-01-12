import React from "react";
import "./SelectForm.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  formControl: {
    margin: "5px",
    minWidth: "150px"
  }
};

class SelectForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
       <div className="form-control-wrapper-container">
        <FormControl style={styles.formControl}>
          <InputLabel id="demo-simple-select-required-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            onChange={this.props.handleChangeLanguage}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"C++"}>C++</MenuItem>
            <MenuItem value={"Go"}>Go</MenuItem>
            <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
            <MenuItem value={"Python"}>Python</MenuItem>
            <MenuItem value={"Scala"}>Scala</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styles.formControl} id="white-form-control">
          <InputLabel id="demo-simple-select-required-label">IDE</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            onChange={this.props.handleChangeIDE}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Atom"}>Atom</MenuItem>
            <MenuItem value={"Eclipse"}>Eclipse</MenuItem>
            <MenuItem value={"IntelliJ"}>IntelliJ</MenuItem>
            <MenuItem value={"PyCharm"}>PyCharm</MenuItem>
            <MenuItem value={"Visual Studio"}>Visual Studio</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel id="demo-simple-select-required-label">
            Predicted Hours
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            onChange={this.props.handleChangePredictedHours}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
          </Select>
        </FormControl>
       </div>
    );
  }
}

export default SelectForm;
