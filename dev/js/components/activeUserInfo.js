import React from "react";
import store from '../store';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';


// var divStyle = {
//     margin-right: "50px"
//   };

// var nameToID = {R6nSbDVly8PUnC6jQFcseDS9sgJ3: 'Chris Boesch', g8odN87wiURjfhqbw1HiMoFIwxn1: 'Neo Ann Qi'}
var nameToID = {'R6nSbDVly8PUnC6jQFcseDS9sgJ3': 'Chris Boesch', '0noxY8s6F2OwxTJHceXH3T4DAmn1': 'KuanFei Lee', '1BB24l4D4Bh7JweUB34tnDCjwUD2': 'Huang Zijia', '1f1XKLCEfvRwxQVpR5Ae2bIAdns1': 'Tang Wenqian', '9tzKGgcDSMNAUxOi9SnneC6rtm02': 'Jin Ming', 'A4hWwaf263UEa9kvqxC3BISHJVf1': 'Ian Sim', 'CATecGNIQ0PHUj4cABkHua3cQWx1': 'Victoria Teo', 'DOhDICDp9sTMRLgYFydI75cH19c2': 'Kai Wen Ng', 'ESnOeVUU5dgpNuuRbbhNhgPByeB2': 'Markus Ng', 'F7Pe3ExuADcp8wONBgRATn1ZCZC2': 'Sheryl Ker', 'G2ktASVX8cMVY2Vau8krVJOC4pp1': 'Ang Kian Hwee', 'GmGxpCuzJzLNApnC0gRHCqpqziD2': 'Darius Yip', 'GoUU4Q4a6UbZfZ4wLRzHH5asw4w1': 'Wai Lun Suen', 'HkguLgzD2ub7BxlzYPscKDpCVu32': 'Lee Chen Yuan', 'MvQbmLEdAUf4c01KGk1zQg2sUlB3': 'PHENG RUEY RYAN TAN', 'N9rrfpLUDiZ8o9pG7AiFxmo5ugA2': '14S44 ZHAI CHEN', 'NhsNAlPJl0aPIvJZ0i66AKaaRoS2': 'Yijing Zhang', 'O7RtuuAwyBT1XjvyWDO73Anv7em1': 'Vincent Leow', 'PWjaGk8I0wfLOOLISRdCgWhVDL23': 'Yan Rong Chng', 'R1Vb5jcjqPdfdNVf8GzA2YghZPJ2': 'Shudan Zheng', 'R6nSbDVly8PUnC6jQFcseDS9sgJ3': 'Prof Boesch', 'Sk2PHYmTkXV66ZLyJSCBKomVke33': 'Terence Lim', 'SvPymG5cfBMbQ1qvTuz4q1ehZQc2': 'Xiao Yunlei', 'WmX6TFEV1oaNPkC2xG7AaxdHOyS2': 'Benita Neo', 'YhTuUV1paodK3UG0U2Ccs9PNJ9H2': 'Tianran Ma', 'aosuWIDNr8VG5cGZQHY6MyMTpi63': 'Tay Jia Hui', 'bc5RYpGmiAg8xgHiJIsvcKEit783': 'Jasvinder Singh', 'eF3udveEKIX0PTMKXRYxiJwn9ie2': 'Yingxu He', 'g8odN87wiURjfhqbw1HiMoFIwxn1': 'Neo Ann Qi', 'gjECftOfG7b5nSi4Yin1NCb5q8y1': 'Desmond Chay', 'hiFxYpd5TAg1Al6yBHczDHszmwu1': 'Chen Kuang', 'qbezhN4NxnbYReIQqC8NYsm5wvJ3': 'Gen Tay', 'reSGNVLjpJfuiZZMdMtCudWM9Xv1': 'tan yu jie', 'tIUiH1fidWVglxY9fH4hnGBqCsE3': 'Justin Choo', 'zcJHP5ryUyXh1PZxd931nTmSK4V2': 'XuanGuang Li'}
// var nameToID = [{ value: 'R6nSbDVly8PUnC6jQFcseDS9sgJ3', label: 'Chris Boesch' }, {'value': '0noxY8s6F2OwxTJHceXH3T4DAmn1', 'label': 'KuanFei Lee'}, {'value': '1BB24l4D4Bh7JweUB34tnDCjwUD2', 'label': 'Huang Zijia'}, {'value': '1f1XKLCEfvRwxQVpR5Ae2bIAdns1', 'label': 'Tang Wenqian'}, {'value': '9tzKGgcDSMNAUxOi9SnneC6rtm02', 'label': 'Jin Ming'}, {'value': 'A4hWwaf263UEa9kvqxC3BISHJVf1', 'label': 'Ian Sim'}, {'value': 'CATecGNIQ0PHUj4cABkHua3cQWx1', 'label': 'Victoria Teo'}, {'value': 'DOhDICDp9sTMRLgYFydI75cH19c2', 'label': 'Kai Wen Ng'}, {'value': 'ESnOeVUU5dgpNuuRbbhNhgPByeB2', 'label': 'Markus Ng'}, {'value': 'F7Pe3ExuADcp8wONBgRATn1ZCZC2', 'label': 'Sheryl Ker'}, {'value': 'G2ktASVX8cMVY2Vau8krVJOC4pp1', 'label': 'Ang Kian Hwee'}, {'value': 'GmGxpCuzJzLNApnC0gRHCqpqziD2', 'label': 'Darius Yip'}, {'value': 'GoUU4Q4a6UbZfZ4wLRzHH5asw4w1', 'label': 'Wai Lun Suen'}, {'value': 'HkguLgzD2ub7BxlzYPscKDpCVu32', 'label': 'Lee Chen Yuan'}, {'value': 'MvQbmLEdAUf4c01KGk1zQg2sUlB3', 'label': 'PHENG RUEY RYAN TAN'}, {'value': 'N9rrfpLUDiZ8o9pG7AiFxmo5ugA2', 'label': '14S44 ZHAI CHEN'}, {'value': 'NhsNAlPJl0aPIvJZ0i66AKaaRoS2', 'label': 'Yijing Zhang'}, {'value': 'O7RtuuAwyBT1XjvyWDO73Anv7em1', 'label': 'Vincent Leow'}, {'value': 'PWjaGk8I0wfLOOLISRdCgWhVDL23', 'label': 'Yan Rong Chng'}, {'value': 'R1Vb5jcjqPdfdNVf8GzA2YghZPJ2', 'label': 'Shudan Zheng'}, {'value': 'R6nSbDVly8PUnC6jQFcseDS9sgJ3', 'label': 'Prof Boesch'}, {'value': 'Sk2PHYmTkXV66ZLyJSCBKomVke33', 'label': 'Terence Lim'}, {'value': 'SvPymG5cfBMbQ1qvTuz4q1ehZQc2', 'label': 'Xiao Yunlei'}, {'value': 'WmX6TFEV1oaNPkC2xG7AaxdHOyS2', 'label': 'Benita Neo'}, {'value': 'YhTuUV1paodK3UG0U2Ccs9PNJ9H2', 'label': 'Tianran Ma'}, {'value': 'aosuWIDNr8VG5cGZQHY6MyMTpi63', 'label': 'Tay Jia Hui'}, {'value': 'bc5RYpGmiAg8xgHiJIsvcKEit783', 'label': 'Jasvinder Singh'}, {'value': 'eF3udveEKIX0PTMKXRYxiJwn9ie2', 'label': 'Yingxu He'}, {'value': 'g8odN87wiURjfhqbw1HiMoFIwxn1', 'label': 'Neo Ann Qi'}, {'value': 'gjECftOfG7b5nSi4Yin1NCb5q8y1', 'label': 'Desmond Chay'}, {'value': 'hiFxYpd5TAg1Al6yBHczDHszmwu1', 'label': 'Chen Kuang'}, {'value': 'qbezhN4NxnbYReIQqC8NYsm5wvJ3', 'label': 'Gen Tay'}, {'value': 'reSGNVLjpJfuiZZMdMtCudWM9Xv1', 'label': 'tan yu jie'}, {'value': 'tIUiH1fidWVglxY9fH4hnGBqCsE3', 'label': 'Justin Choo'}, {'value': 'zcJHP5ryUyXh1PZxd931nTmSK4V2', 'label': 'XuanGuang Li'}]
class ActiveUserInfo extends React.Component{        

    componentDidMount() {
        console.log("component mounted");
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }  

    render() {
        return (
            <div style = {{marginRight:"50px", marginTop:"5px"}}>
                <div><strong>Name: </strong>{nameToID[store.getState().activeProfile.val.uid]}</div>
                <div><strong>Role: </strong>{store.getState().activeProfile.val.role}</div>
                <div><strong>Course: </strong>{store.getState().activeProfile.val.course}</div>
            </div>
        )
    }
}

export default ActiveUserInfo;