package com.example.demo;

public class myPosition {
	private Integer RecordID;
	private String MyLatitude;
	private String MyLongitude;
	private String MyRecordContent;
	private String RecordTime;
	private String Day;
	private String PicturePos;
	private String Name;
	private String Desname;
	private Integer UserID;
	private String OpenID;
	private Integer ConcreteID;
	public myPosition(Integer RecordID,String MyLatitude,String MyLongitude,String MyRecordContent,String RecordTime,String Day,String PicturePos,String Name,String Desname,Integer UserID,String OpenID,Integer ConcreteID){
		this.RecordID=RecordID;
		this.MyLatitude=MyLatitude;
		this.MyLongitude=MyLongitude;
		this.MyRecordContent=MyRecordContent;
		this.RecordTime=RecordTime;
		this.Day=Day;
		this.PicturePos=PicturePos;
		this.Name=Name;
		this.Desname=Desname;
		this.UserID=UserID;
		this.OpenID=OpenID;
		this.ConcreteID=ConcreteID;
	}
	public Integer getRecordID() {
		return this.RecordID;
	}
	public void setRecordID(Integer RecordID) {
		this.RecordID=RecordID;
	}
	public String getMyLatitude() {
		return this.MyLatitude;
	}
	public void setMyLatitude(String MyLatitude) {
		this.MyLatitude=MyLatitude;
	}
	public String getMyLongitude() {
		return this.MyLongitude;
	}
	public void setMyLongitude(String MyLontitude) {
		this.MyLongitude=MyLontitude;
	}
	public String getMyRecordContent() {
		return this.MyRecordContent;
	}
	public void setMyRecordContent(String MyRecordContent) {
		this.MyRecordContent=MyRecordContent;
	}
	public String getRecordTime() {
		return this.RecordTime;
	}
	public void setRecordTime(String RecordTime) {
		this.RecordTime=RecordTime;
	}
	public String getDay() {
		return this.Day;
	}
	public void setDay(String Day) {
		this.Day=Day;
	}
	public String getPicturePos() {
		return this.PicturePos;
	}
	public void setPicturePos(String PicturePos) {
		this.PicturePos=PicturePos;
	}
	public String getName() {
		return this.Name;
	}
	public void setName(String Name) {
		this.Name=Name;
	}
	public String getDesname() {
		return this.Desname;
	}
	public void setDesname(String Desname) {
		this.Desname=Desname;
	}
	public Integer getUserID() {
		return this.UserID;
	}
	public void setUserID(Integer UserID) {
		this.UserID=UserID;
	}
	public String getOpenID() {
		return this.OpenID;
	}
	public void setOpenID(String OpenID) {
		this.OpenID=OpenID;
	}
	public Integer getConcreteID(Integer ConcreteID) {
		return this.ConcreteID;
	}
	public void setConcreteID(Integer ConcreteID) {
		this.ConcreteID=ConcreteID;
	}
	@Override
	public String toString() {
		return "myPosition{" +
                "RecordID=" + RecordID +
                ", MyLatitude='" + MyLatitude + '\'' +
                ", MyLongitude='" + MyLongitude + '\'' +
                ", MyRecordContent='" + MyRecordContent + '\'' +
                ", RecordTime='" + RecordTime + '\'' +
                ", Day='" + Day + '\'' +
                ", PicturePos='" + PicturePos + '\'' +
                ", Name='" + Name + '\'' +
                ", Desname='" + Desname + '\'' +
                ", UserID='" + UserID + '\'' +
                ", OpenID='" + OpenID + '\'' +
                ", ConcreteID=" + ConcreteID +
                '}';
	}
}
