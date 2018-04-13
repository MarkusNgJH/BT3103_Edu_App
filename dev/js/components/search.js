import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Search extends React.Component {


  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
    console.log( selectedOption.value );
    this.props.handleUIDChange2( selectedOption.value );
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select
        name="form-field-name"
        placeholder={'Enter Name ...'}
        value={value}
        style={{maxWidth: "350px", margin: "auto"}}
        onChange={this.handleChange}
        options={[
          { value: 'R6nSbDVly8PUnC6jQFcseDS9sgJ3', label: 'Chris Boesch' },
          { value: 'g8odN87wiURjfhqbw1HiMoFIwxn1', label: 'Neo Ann Qi' },
        ]}
      />
    );
  }
}

export default Search