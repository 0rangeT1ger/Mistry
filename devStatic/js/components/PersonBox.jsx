/**
 * Created by wujianbo on 15/9/21.
 */
var React = require('react');
/*TODO：要写的CSS：
*     .userAvatar
*     .personBoxContainer
*     .btn
*     .btn-disabled
*     .btn-active
*     .userBio
*     .userName
*     */
module.exports = React.createClass({
    getDefaultProps: function(){
        return{
            userAvatarSrc: '',
            userName: '',
            userBio: '',
            userId: '',
            invited: false,
            inviteBtnCallback: function(){},
            cancelInviteBtnCallback: function(){}
        }
    },
    getInitialState: function(){
        return{
            invited: this.props.invited
        }
    },
    inviteBtnClickHandler: function(ev){
        var $this = this,
            personId = ev.target.id.split('-')[0];
        this.props.inviteBtnCallback(function(){    //此处回调函数设计的考虑：
            $this.setState({                        //这个操作可能会发送ajax请求。所以应当根据ajax请求的结果来判断是否应当改变页面显示状态
                invited: !$this.state.invited
            })
        }, personId);
    },
    cancelInviteBtnClickHandler: function(ev){
        var $this = this,
            personId = ev.target.id.split('-')[0];
        this.props.cancelInviteBtnCallback(function(){    //此处回调函数设计的考虑：
            $this.setState({                        //这个操作可能会发送ajax请求。所以应当根据ajax请求的结果来判断是否应当改变页面显示状态
                invited: !$this.state.invited
            })
        }, personId);
    },
    render: function(){
        return(
            <div id={this.props.userId + '-container'} className="personBoxContainer">
                <img src={this.props.userAvatarSrc} alt="头像" className="userAvatar"/>
                <p className="userName">{this.props.userName}</p>
                <p className="userBio">{this.props.userBio}</p>
                <a className={'btn' + ((this.state.invited) ? ' btn-disabled' : ' btn-active')}
                   id={this.props.userId + '-inviteBtn'}
                   onClick={this.state.invited ? this.cancelInviteBtnClickHandler :this.inviteBtnClickHandler}
                   href="javascript:;">
                    {this.state.invited?'收回邀请':'邀请回答'}
                </a>
            </div>
        )
    }
});