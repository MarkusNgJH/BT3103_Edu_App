import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});

class profileSetting extends React.Component {
    state = {
        userID: '',
        ViewType: false,
    };

    render(){
        return(
            <div>
                <h1>This is profile setting page</h1>
                <div style={{ width: '20%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px' }}>
                    <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                        <InputLabel htmlFor="name-helper">User ID</InputLabel>
                        <Input id="userId" placeholder="Enter your User ID here" />
                    </FormControl>

                    <br /> <br />
                    <FormControl className={classNames(styles.margin, styles.textField)}>
                        <label>
                            Select your View Type
                            <select name="view">
                            <option value="stu">Student</option>
                            <option value="ins">Instructor</option>
                            <option value="adm">Administrator</option>
                            </select>
                        </label>
                        
                        {/* <Input
                            id="adornment-viewType"
                            placeholder="Enter your View Type here"
                        /> */}
                    </FormControl>

                    <br /> <br />
                    <button style={{ float: 'right' }}>Submit</button>
                </div>

            </div>
        )
    }
}


export default profileSetting;