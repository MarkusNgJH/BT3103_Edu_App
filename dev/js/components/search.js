import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import 'react-select/dist/react-select.css';

class Search extends React.Component {
  state = {
    selectedOption: '',
    userList: [{ value: 'R6nSbDVly8PUnC6jQFcseDS9sgJ3', label: 'Chris Boesch' }, {'value': '0noxY8s6F2OwxTJHceXH3T4DAmn1', 'label': 'KuanFei Lee'}, {'value': '1BB24l4D4Bh7JweUB34tnDCjwUD2', 'label': 'Huang Zijia'}, {'value': '1f1XKLCEfvRwxQVpR5Ae2bIAdns1', 'label': 'Tang Wenqian'}, {'value': '9tzKGgcDSMNAUxOi9SnneC6rtm02', 'label': 'Jin Ming'}, {'value': 'A4hWwaf263UEa9kvqxC3BISHJVf1', 'label': 'Ian Sim'}, {'value': 'CATecGNIQ0PHUj4cABkHua3cQWx1', 'label': 'Victoria Teo'}, {'value': 'DOhDICDp9sTMRLgYFydI75cH19c2', 'label': 'Kai Wen Ng'}, {'value': 'ESnOeVUU5dgpNuuRbbhNhgPByeB2', 'label': 'Markus Ng'}, {'value': 'F7Pe3ExuADcp8wONBgRATn1ZCZC2', 'label': 'Sheryl Ker'}, {'value': 'G2ktASVX8cMVY2Vau8krVJOC4pp1', 'label': 'Ang Kian Hwee'}, {'value': 'GmGxpCuzJzLNApnC0gRHCqpqziD2', 'label': 'Darius Yip'}, {'value': 'GoUU4Q4a6UbZfZ4wLRzHH5asw4w1', 'label': 'Wai Lun Suen'}, {'value': 'HkguLgzD2ub7BxlzYPscKDpCVu32', 'label': 'Lee Chen Yuan'}, {'value': 'MvQbmLEdAUf4c01KGk1zQg2sUlB3', 'label': 'PHENG RUEY RYAN TAN'}, {'value': 'N9rrfpLUDiZ8o9pG7AiFxmo5ugA2', 'label': '14S44 ZHAI CHEN'}, {'value': 'NhsNAlPJl0aPIvJZ0i66AKaaRoS2', 'label': 'Yijing Zhang'}, {'value': 'O7RtuuAwyBT1XjvyWDO73Anv7em1', 'label': 'Vincent Leow'}, {'value': 'PWjaGk8I0wfLOOLISRdCgWhVDL23', 'label': 'Yan Rong Chng'}, {'value': 'R1Vb5jcjqPdfdNVf8GzA2YghZPJ2', 'label': 'Shudan Zheng'}, {'value': 'R6nSbDVly8PUnC6jQFcseDS9sgJ3', 'label': 'Prof Boesch'}, {'value': 'Sk2PHYmTkXV66ZLyJSCBKomVke33', 'label': 'Terence Lim'}, {'value': 'SvPymG5cfBMbQ1qvTuz4q1ehZQc2', 'label': 'Xiao Yunlei'}, {'value': 'WmX6TFEV1oaNPkC2xG7AaxdHOyS2', 'label': 'Benita Neo'}, {'value': 'YhTuUV1paodK3UG0U2Ccs9PNJ9H2', 'label': 'Tianran Ma'}, {'value': 'aosuWIDNr8VG5cGZQHY6MyMTpi63', 'label': 'Tay Jia Hui'}, {'value': 'bc5RYpGmiAg8xgHiJIsvcKEit783', 'label': 'Jasvinder Singh'}, {'value': 'eF3udveEKIX0PTMKXRYxiJwn9ie2', 'label': 'Yingxu He'}, {'value': 'g8odN87wiURjfhqbw1HiMoFIwxn1', 'label': 'Neo Ann Qi'}, {'value': 'gjECftOfG7b5nSi4Yin1NCb5q8y1', 'label': 'Desmond Chay'}, {'value': 'hiFxYpd5TAg1Al6yBHczDHszmwu1', 'label': 'Chen Kuang'}, {'value': 'qbezhN4NxnbYReIQqC8NYsm5wvJ3', 'label': 'Gen Tay'}, {'value': 'reSGNVLjpJfuiZZMdMtCudWM9Xv1', 'label': 'tan yu jie'}, {'value': 'tIUiH1fidWVglxY9fH4hnGBqCsE3', 'label': 'Justin Choo'}, {'value': 'zcJHP5ryUyXh1PZxd931nTmSK4V2', 'label': 'XuanGuang Li'}]
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log(`Selected: ${selectedOption.label}`);
    // console.log( selectedOption.value );
    this.props.handleUIDChange2( selectedOption.value );
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    // console.log(Object.keys(this.props.firebase.val))
    console.log(this.props.activeView)
    console.log(this.props.activeProfile)
    return (
      <Select
        name="form-field-name"
        placeholder={'Enter Name ...'}
        value={value}
        style={{maxWidth: "350px", margin: "auto", marginTop: "35px"}}
        onChange={this.handleChange}
        options={this.state.userList}
      />
    );
  }
}

function mapStateToProps(state){
  return{
      firebase: state.firebase,
      activeProfile: state.activeProfile,
      activeView: state.activeView
  };
}    


export default connect(mapStateToProps)(Search); 


// export default Search