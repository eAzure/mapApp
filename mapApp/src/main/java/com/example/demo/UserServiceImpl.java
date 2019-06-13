package com.example.demo;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import java.util.List;
 
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper; //这里会报错，但并不影响
 
    @Override
    public int addUser(User user) {
        return userMapper.insertUser(user);
    }
 
    @Override
    public int deleteUser(Integer id) {
        return userMapper.deleteUser(id);
    }
 
    @Override
    public User selectUser(Integer id) {
        return userMapper.selectUser(id);
    }
 
    @Override
    public List<User> findAll() {
        return userMapper.selectAll();
    }
 
    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }
    //添加我的信息的操作
    @Override
    public int addMyPosition(myPosition mP) {
    	return userMapper.insertMyTargetPosition(mP);
    }
    //查询记录里有多少条数据的操作
    @Override
    public int countMyPosition() {
    	return userMapper.selectCountOfPos();
    }
    //查询相同的天里位置的信息
    @Override 
    public List<Day> findTheDay(){
    	return userMapper.selectTheDay();
    }
    @Override
    public List<myPosition>findThePositionLine(String Day){
    	return userMapper.selectThePositionLine(Day);
    }
    @Override
    public List<myPosition>findTheAllPosition(){
    	return userMapper.selectTheAllPositionRecord();
    }
    @Override
    public List<myPosition>findTheOnePosition(Integer UserID,Integer ConcreteID){
    	return userMapper.selectTheOnePositionRecord(UserID,ConcreteID);
    }
    //查看有多少条轨迹记录信息
    @Override
    public int findTheNumberOfTheTraceID() {
    	return userMapper.selectCountOfMyTraceID();
    };
    //插入我所记录的轨迹的每一时刻的经纬度信息
    @Override
    public int addMyPerTrace(myPerTrace mP) {
    	return userMapper.insertMyPerTimeTrace(mP);
    }
    //查看其中一条路径的信息
    @Override
    public List<myPerTrace>findTheConcreteTrace(Integer TraceID){
    	return userMapper.selectTheConcreteTrace(TraceID);
    }
  //取得每一条路径的第一个时间采样点的信息
    @Override
    public List<myPerTrace>findTheFirstTimeTrace(){
    	return userMapper.selectTheFirstTimeTrace();
    }
    //判断管理用户者的登陆信息是否正确
    @Override
    public ManageUser findTheManageUser(String UserName,String UserPassword) {
    	return userMapper.searchManageUserInfo(UserName, UserPassword);
    }
    //删除我所记录的位置的信息
    @Override
    public int removeMyPosition(Integer RecordID) {
    	return userMapper.deleteMyPosition(RecordID);
    }
    //更改主键信息
    @Override
    public int changeRecordID() {
    	return userMapper.updateRecordID();
    }
    //删除轨迹点的操作
    @Override
    public int removeMyTrace(Integer TraceID) {
    	return userMapper.deleteMyTrace(TraceID);
    }
    //更改TraceID的操作
    @Override
    public int changeTraceID(Integer TraceID) {
    	return userMapper.updateTraceID(TraceID);
    }
    //实现多用户的操作
    @Override
    public int findIfExitTheOpenID(String OpenID) {
    	return userMapper.selectIfExitTheOpenID(OpenID);
    }
    @Override
    public int findTheUserID(String OpenID) {
    	return userMapper.selectTheUserID(OpenID);
    }
    @Override
    public int findTheCountOfUser() {
    	return userMapper.selectTheCountOfUser();
    }
    //查找单用户的位置记录信息
    @Override
    public List<myPosition> findForUserPositionRecord(Integer UserID){
    	return userMapper.selectForUserPositionRecord(UserID);
    }
    //查看一个用户下它有多少条轨迹
    @Override
    public int findTheCountOfOneUserPosition(Integer UserID) {
    	return userMapper.selectTheCountOfOneUserPosition(UserID);
    }
    //更改RecordForUserID
    @Override
    public int changeRecordForUserID(Integer ConcreteID) {
    	return userMapper.updateRecordForUserID(ConcreteID);
    }
    //查找该条信息的ConcreteID
    @Override
    public int findConcreteID(Integer UserID,Integer RecordID) {
    	return userMapper.selectTheConcreteID(UserID, RecordID);
    }
    //给管理者写的查询某一具体位置的方法
    public List<myPosition> findTheForManagerConcretePos(Integer RecordID) {
    	return userMapper.selectTheForManagerConcretePos(RecordID);
    }
    //插入聊天信息
    @Override
    public int addChatContent(chatContent content) {
    	return userMapper.insertMyChatContent(content);
    }
    //返回聊天记录数量
    @Override
    public int findTheCountOfChat() {
    	return userMapper.selectTheCountOfChat();
    }
    //返回聊天列表信息
    @Override
    public List<chatContent>findTheChatList(){
    	return userMapper.selectTheChatContent();
    }
    //删除消息列表里的信息
    @Override
    public int removeTheChatMessage(Integer RecordID) {
    	return userMapper.deleteTheChatMessage(RecordID);
    }
    //更改主键信息
    @Override
    public int changeChatMessageRecordID() {
    	return userMapper.updateChatMessageRecordID();
    }
}