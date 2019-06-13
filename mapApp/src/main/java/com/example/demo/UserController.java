package com.example.demo;

import org.apache.ibatis.annotations.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import net.sf.json.JSON;
import net.sf.json.JSONArray;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
 
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	@Autowired
	private UserServiceImpl userService;

	@RequestMapping(value = "/findAll")
	@ResponseBody
	public List<User> findAll() {
		return userService.findAll();
	}

	@RequestMapping(value = "add")
	@ResponseBody
	public int addUser() {
		User u = new User(99, "oooo", 45);
		int stat = userService.addUser(u);
		return stat;
	}

	//插入我所记录的位置信息的操作
	@RequestMapping(value="addMyPosition{RecordID,MyLatitude,MyLongitude,MyRecordContent,RecordTime,Day,PicturePos,Name,Desname,UserID,OpenID,ConcreteID}")
	@ResponseBody
	public int addmyPosition(Integer RecordID,String MyLatitude,String MyLongitude,String MyRecordContent,String RecordTime,String Day,String PicturePos,String Name,String Desname,Integer UserID,String OpenID,Integer ConcreteID) {
		myPosition mP=new myPosition(RecordID,MyLatitude,MyLongitude,MyRecordContent,RecordTime,Day,PicturePos,Name,Desname,UserID,OpenID,ConcreteID);
		return userService.addMyPosition(mP);
	}
	 
	//查询记录里有多少条记录的位置信息
	@RequestMapping(value="/countPositionNum")
	@ResponseBody
	public int countPositionNum() {
		return userService.countMyPosition();
	}
	
	//查询记录里相同天里的信息
	@RequestMapping(value="/findTheDay")
	@ResponseBody
	public List<Day> findTheSameDay(){
		return userService.findTheDay();
	}
	@RequestMapping(value="/findThePositionLine{Day}")
	@ResponseBody
	public List<myPosition>findThePosLine(String Day){
		return userService.findThePositionLine(Day);
	}
	@RequestMapping(value="/findTheAllRecordPosition")
	@ResponseBody
	public List<myPosition>findTheWholePosition(){
		return userService.findTheAllPosition();
	}
	@RequestMapping(value="/findTheOneRecordPosition{UserID,ConcreteID}")
	@ResponseBody
	public List<myPosition>findAPositionRecord(Integer UserID,Integer ConcreteID){
		return userService.findTheOnePosition(UserID,ConcreteID);
	}
	
	//查看有多少条轨迹记录信息
    @RequestMapping(value="/findTheNumberOfTraceID")
    @ResponseBody
    public int findTraceIDCount() {
    	return userService.findTheNumberOfTheTraceID();
    }
	 
    //插入我所记录的轨迹的每一时刻的经纬度信息
    @RequestMapping(value="/addMyPerTrace{TraceID,Longitude,Latitude}")
    @ResponseBody
    public int addPerTrace(Integer TraceID,String Longitude,String Latitude,String TheFirstDate) {
    	myPerTrace mP=new myPerTrace(TraceID,Longitude,Latitude,TheFirstDate);
    	return userService.addMyPerTrace(mP);
    }
	
    //查看其中一条路径的信息
    @RequestMapping(value="/findTheConcreteTrace{TraceID}")
    @ResponseBody
    public List<myPerTrace>findAConcreteTrace(Integer TraceID){
    	return userService.findTheConcreteTrace(TraceID);
    }
	 
    //只查找每一路径的第一个记录
    @RequestMapping(value="/findTheFirstTrace")
    @ResponseBody
    public List<myPerTrace>findTheFirstMesOfTheTrace(){
    	return userService.findTheFirstTimeTrace();
    }
    
    //判断管理者的登录信息是否正确
    @RequestMapping(value="/judgeTheManager{UserName,UserPassword}")
    @ResponseBody
    public ManageUser judgeTheManager(String UserName,String UserPassword) {
    	return userService.findTheManageUser(UserName, UserPassword);
    }
    
    //删除我所记录的位置的信息
    @RequestMapping(value="/removeMyPosition{RecordID}")
    @ResponseBody
    public int remvMyPosition(Integer RecordID) {
    	return userService.removeMyPosition(RecordID);
    }
    //更改主键信息
    @RequestMapping(value="/changeRecordID")
    @ResponseBody
    public int chanRecordID() {
    	return userService.changeRecordID();
    }
    //更改RecordForUserID
    @RequestMapping(value="/changeRecordForUserID{ConcreteID}")
    @ResponseBody
    public int chanRecordForUserID(Integer ConcreteID) {
    	return userService.changeRecordForUserID(ConcreteID);
    }
    
    //删除轨迹点的操作
    @RequestMapping(value="/remvMyTrace{TraceID}")
    @ResponseBody
    public int remvMyTrace(Integer TraceID) {
    	return userService.removeMyTrace(TraceID);
    }
    
    //更改TraceID的操作
    @RequestMapping(value="/changTraceID{TraceID}")
    @ResponseBody
    public int changTraceID(Integer TraceID) {
    	return userService.changeTraceID(TraceID);
    }
    
    //实现多用户的操作
    @RequestMapping(value="/findTheIfExitOpenID{OpenID}")
    @ResponseBody
    public int findTheIfExitOpenID(String OpenID) {
    	return userService.findIfExitTheOpenID(OpenID);
    }
    @RequestMapping(value="/findtheUserID{OpenID}")
    @ResponseBody
    public int findtheUserID(String OpenID) {
    	return userService.findTheUserID(OpenID);
    }
    @RequestMapping(value="/findTheNumOfTheUser")
    @ResponseBody
    public int findTheNumOfUser() {
    	return userService.findTheCountOfUser();
    }
    
    //查找单用户的位置记录信息
    @RequestMapping(value="/findTheConcreteForUserPositionRecord{UserID}")
    @ResponseBody
    public List<myPosition>findTheConcreteForUserPositionRecord(Integer UserID){
    	return userService.findForUserPositionRecord(UserID);
    }
    
    //查看一个用户下有多少条轨迹记录
    @RequestMapping(value="/findTheCountOfOneUserPosition{UserID}")
    @ResponseBody
    public int findTheNumOfOneUserPosition(Integer UserID) {
    	return userService.findTheCountOfOneUserPosition(UserID);
    }
    
    //查找该记录的ConcreteID
    @RequestMapping(value="/getTheConcreteID{UserID,RecordID}")
    @ResponseBody
    public int getTheConcreteID(Integer UserID,Integer RecordID) {
    	return userService.findConcreteID(UserID, RecordID);
    }
    
    //给管理者写的查看某一具体位置的方法
    @RequestMapping(value="/getTheForManagerPos{RecordID}")
    @ResponseBody
    public List<myPosition> getTheForManagerPos(Integer RecordID){
    	return userService.findTheForManagerConcretePos(RecordID);
    }
    
    //插入聊天信息
    @RequestMapping(value="/addChatContent{RecordID,UserID,ChatContent,ChatTime}")
    @ResponseBody
    public int adchatContent(Integer RecordID,Integer UserID,String ChatContent,String ChatTime) {
    	chatContent content=new chatContent(RecordID,UserID,ChatContent,ChatTime);
    	return userService.addChatContent(content);
    }
    
    //查询聊天记录的数量
    @RequestMapping(value="findTheNumOfChat")
    @ResponseBody
    public int findTheNumOfChat() {
    	return userService.findTheCountOfChat();
    }
    
    //返回聊天列表消息
    @RequestMapping(value="findTheMessageList")
    @ResponseBody
    public List<chatContent>findTheMessageList(){
    	return userService.findTheChatList();
    }
    
    //删除消息列表里的信息
    @RequestMapping(value="remvTheChatMessage{RecordID}")
    @ResponseBody
    public int remvTheChatMessage(Integer RecordID) {
    	return userService.removeTheChatMessage(RecordID);
    }
    //更改主键信息
    @RequestMapping(value="chanChatMessageRecordID")
    @ResponseBody
    public int chanChatMessageRecordID() {
    	return userService.changeChatMessageRecordID();
    }
    
    
	@RequestMapping(value = "/weChat/uploadImage{{ImageName}}", method = { RequestMethod.POST,RequestMethod.GET})
    public ModelAndView uploadImage(String ImageName,HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("进入传照片方法！");
        MultipartHttpServletRequest req =(MultipartHttpServletRequest)request;
        MultipartFile multipartFile =  req.getFile("file");
        String realPath = "D:/JavaWorkSpace/mapApp/src/main/resources/static";
        try {
            File dir = new File(realPath);
            if (!dir.exists()) {
                dir.mkdir();
            }
            String abc=ImageName+".jpg";
            File file  =  new File(realPath,abc);
            multipartFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
        return null;
    }
	

	// 后台网站部分，要传到服务器时，需将下面的return中的“/”去掉
	@RequestMapping(value = "/first")
	public String firstHtml() {
		return "first";
	}
	@RequestMapping(value="/positionManage")
	public String posManHtml() {
		return "positionManage";
	}
	@RequestMapping(value="/trackManage")
	public String traManHtml() {
		return "trackManage";
	}
	@RequestMapping(value="/aboutme")
	public String aboutmeHtml() {
		return "aboutme";
	}
	@RequestMapping(value="/login")
	public String loginHtml() {
		return "login";
	}
	@RequestMapping(value="/theConcreteMap")
	public String concreteMap() {
		return "theConcreteMap";
	}
	@RequestMapping(value="/myTrace")
	public String myTraceHtml() {
		return "myTrace";
	}
	@RequestMapping(value="/traceManage")
	public String traceManageHtml() {
		return "traceManage";
	}
	@RequestMapping(value="/chatMessage")
	public String chatMessageHtml() {
		return "chatMessage";
	}
}