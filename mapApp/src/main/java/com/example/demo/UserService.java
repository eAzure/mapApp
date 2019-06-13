package com.example.demo;
 
import java.util.List;
 
public interface UserService {
    int addUser(User user);
    int deleteUser(Integer id);
    User selectUser(Integer id);
    int updateUser(User user);
    List<User> findAll();
    //记录我当前的位置
    int addMyPosition(myPosition mP);
    //查看记录里有多少条数据
    int countMyPosition();
    //查询相同的天里位置的信息
    List<Day> findTheDay();
    List<myPosition>findThePositionLine(String Day);
    List<myPosition>findTheAllPosition();
    List<myPosition>findTheOnePosition(Integer UserID,Integer ConcreteID);
    //查看有多少条轨迹记录信息
    int findTheNumberOfTheTraceID();
    //插入我所记录的轨迹的每一时刻的经纬度信息
    int addMyPerTrace(myPerTrace mP);
    //查看其中一条路径的信息
    List<myPerTrace>findTheConcreteTrace(Integer TraceID);
    //取得每一条路径的第一个时间采样点的信息
    List<myPerTrace>findTheFirstTimeTrace();
    //判断管理用户者的登录信息是否正确
    ManageUser findTheManageUser(String UserName,String UserPassword);
    //删除我所记录的位置的信息
    int removeMyPosition(Integer RecordID);
    //更改主键信息
    int changeRecordID();
    //删除轨迹点的操作
    int removeMyTrace(Integer TraceID);
    //更改TraceID的操作
    int changeTraceID(Integer TraceID);
    //实现多用户的操作
    int findIfExitTheOpenID(String OpenID);
    int findTheUserID(String OpenID);
    int findTheCountOfUser();
    //查找单用户的位置记录信息
    List<myPosition>findForUserPositionRecord(Integer UserID);
    //查看一个用户下它有多少条轨迹
    int findTheCountOfOneUserPosition(Integer UserID);
    //更改RecordForUserID
    int changeRecordForUserID(Integer ConcreteID);
    //查找该条信息的ConcreteID
    int findConcreteID(Integer UserID,Integer RecordID);
    //给管理者写的查询某一具体位置的方法
    List<myPosition>findTheForManagerConcretePos(Integer RecordID);
    //插入聊天信息
    int addChatContent(chatContent content);
    //返回聊天记录数量
    int findTheCountOfChat();
    //返回聊天列表消息
    List<chatContent>findTheChatList();
    //删除消息列表里的消息
    int removeTheChatMessage(Integer RecordID);
    //更改主键信息
    int changeChatMessageRecordID();
}