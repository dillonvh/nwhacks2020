import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 150,
    color: 'white'
  },
}));

export default function SelectForms() {
  const classes = useStyles();
  const [language, setLanguage] = React.useState('');
  const [ide, setIDE] = React.useState('');
  const [predictedHours, setPredictedHours] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  };
  const handleIDEChange = event => {
    setIDE(event.target.value);
  };
  const handlePredictedHoursChange = event => {
    setPredictedHours(event.target.value);
  };

  return (
      <div>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-required-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={language}
            onChange={handleLanguageChange}
            className={classes.selectEmpty}
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
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-required-label">IDE</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={ide}
            onChange={handleIDEChange}
            className={classes.selectEmpty}
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
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required className={classes.formControl}>
          <InputLabel id="demo-simple-select-required-label">Predicted Hours</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={predictedHours}
            onChange={handlePredictedHoursChange}
            className={classes.selectEmpty}
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
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      </div>
    );
  }
