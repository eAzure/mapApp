package com.example.demo;
 
import java.util.List;
 
public interface UserMapper {
    int insertUser(User user);
    int deleteUser(Integer id);
    User selectUser(Integer id);
    int updateUser(User user);
    List<User> selectAll();
    //记录我的位置的操作
    int insertMyTargetPosition(myPosition mP);
    //查看位置表里有多少条数据
    int selectCountOfPos();
    //查询相同的天里位置的信息
    List<Day> selectTheDay();
    List<myPosition>selectThePositionLine(String Day);
    List<myPosition>selectTheAllPositionRecord();
    List<myPosition>selectTheOnePositionRecord(Integer UserID,Integer ConcreteID);
    //查看有多少条轨迹记录信息
    int selectCountOfMyTraceID();
    //插入我所记录的轨迹的每一时刻的经纬度信息
    int insertMyPerTimeTrace(myPerTrace mP);
    //查看其中一条路径的信息
    List<myPerTrace>selectTheConcreteTrace(Integer TraceID);
    //取得每一条路径的第一个时间采样点的信息
    List<myPerTrace>selectTheFirstTimeTrace();
    //判断管理用户的登录信息
    ManageUser searchManageUserInfo(String UserName,String UserPassword);
    //删除所记录的位置信息
    int deleteMyPosition(Integer RecordID);
    //更改主键信息
    int updateRecordID();
    //删除轨迹点的操作
    int deleteMyTrace(Integer TraceID);
    //更改TraceID的操作
    int updateTraceID(Integer TraceID);
    //实现多用户的操作
    int selectIfExitTheOpenID(String OpenID);
    int selectTheUserID(String OpenID);
    int selectTheCountOfUser();
    //查找单用户的位置记录信息
    List<myPosition>selectForUserPositionRecord(Integer UserID);
    //查看一个用户下它有多少条轨迹
    int selectTheCountOfOneUserPosition(Integer UserID);
    //更改RecordForUserID
    int updateRecordForUserID(Integer ConcreteID);
    //查找该条信息的ConcreteID
    int selectTheConcreteID(Integer UserID,Integer RecordID);
    //给管理者写的查询某一具体路径的方法
    List<myPosition>selectTheForManagerConcretePos(Integer RecordID);
    //插入聊天信息
    int insertMyChatContent(chatContent content);
    //返回聊天记录数量
    int selectTheCountOfChat();
    //返回聊天列表信息
    List<chatContent>selectTheChatContent();
    //删除消息列表里的消息
    int deleteTheChatMessage(Integer RecordID);
    //更改主键信息
    int updateChatMessageRecordID();
}