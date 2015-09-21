/**
 * Created by wujianbo on 15/9/21.
 */
var React = require('react'),
    PersonBox = require('../components/PersonBox.jsx'),
    extend = require('../libs/common.js').extend;
require('../../css/main/main.css');

var MainPage = React.createClass({
    getInitialState: function(){
        return{
            invitedPersonList: [],
            personList: [],
            simData: {}                        //思路：本地维护一个和服务器端一模一样的数据结构，提交数据隐性进行，流畅体验。
        }
    },
    componentDidMount: function(){
        var initReq = new XMLHttpRequest(),
            $this = this;
        initReq.open('GET','/invitePanel',true);
        initReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        initReq.onreadystatechange = function(){
            if(initReq.readyState==4 && initReq.status==200){
                var resData = JSON.parse(initReq.responseText);
                var data_clean = $this.washInitialData(resData);
                $this.setState({
                    personList: data_clean.invited.concat(data_clean.recommended),
                    invitedPersonList: data_clean.invited
                });
            }
        };
        initReq.send();
    },
    findPersonById: function(id){
        for(let i = 0, len = this.state.personList.length; i<len; i++){
            if( this.state.personList[i] && this.state.personList[i].id == id ){
                return this.state.personList[i];
            }
        }
        return false;
    },
    washInitialData: function(data){
        for(let i = 0, len = data.invited.length; i<len; i++){
            data.invited[i].invited = true;
        }
        for(let i = 0, len = data.recommended.length; i<len; i++){
            data.recommended[i].invited = false;
        }
        return data;
    },
    changePersonInvitedStatus: function(personId){
        var tempPersonList = [];
        var personList = tempPersonList.concat(this.state.personList);
        for(let i = 0, len = personList.length; i<len; i++){
            if(personList[i].id == personId){
                personList[i].invited = !personList[i].invited;
            }
        }
        this.setState({
            personList: personList
        });
    },
    invitePerson: function(callback, personId){     //Node正在学习中，还没学到如何处理post请求，所以只修改本地数据做一个模拟。
        var tempPersonList = [];
        var invitedPersonList = tempPersonList.concat(this.state.invitedPersonList),
            person = this.findPersonById(personId);
        this.changePersonInvitedStatus(personId);
        invitedPersonList.push(person);
        this.setState({
            invitedPersonList: invitedPersonList
        },function(){
            callback();
        });
    },
    cancelInvitePerson: function(callback, personId){
        var tempPersonList = [];
        var invitedPersonList = tempPersonList.concat(this.state.invitedPersonList);
        this.changePersonInvitedStatus(personId);
        for(let i = 0, len = invitedPersonList.length; i<len; i++){
            if(invitedPersonList[i].id == personId){
                invitedPersonList.splice(i, 1);
                break;
            }
        }
        this.setState({
            invitedPersonList: invitedPersonList
        }, function(){
            callback();
        });
    },
    displayInvitedPersonTag: function(list){
        var tempPersonTagList = [];
        if(list && list.length!==0){
            for(let i = 0, len = list.length; i<len; i++){
                tempPersonTagList.push((
                    <a className="nameTag" key={i} href="javascript:;">{list[i].name}</a>
                ))
            }
            return (<span>您已邀请{tempPersonTagList}等{list.length}人</span>);
        }
        else{
            return (<span>您还没有邀请任何人，快去邀请吧！</span>)
        }
    },
    displayPerson: function(list){
        var tempPersonNodeList = [];
        if(list && list.length!==0){
            for(let i = 0, len = list.length; i<len; i++){
                tempPersonNodeList.push((
                    <PersonBox
                        key={i}
                        userAvatarSrc={list[i].avatarUrl}
                        userName={list[i].name}
                        userBio={list[i].bio}
                        userId={list[i].id}
                        invited={list[i].invited}
                        inviteBtnCallback={this.invitePerson}
                        cancelInviteBtnCallback={this.cancelInvitePerson}/>
                ))
            }
            return tempPersonNodeList;
        }
        else{
            return (<h4>暂无数据！</h4>)
        }
    },
    render: function(){
        return(
            <div className="mainpage">
                <div className="searchBox">
                    <input type="text" placeholder={'搜索你想要邀请的人'}/>
                    {this.displayInvitedPersonTag(this.state.invitedPersonList)}
                </div>
                {this.displayPerson(this.state.personList)}
            </div>
        )
    }
});
React.render(
    <MainPage />,
    document.getElementById('content')
);
