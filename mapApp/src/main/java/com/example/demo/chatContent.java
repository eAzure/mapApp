package com.example.demo;

public class chatContent {
	private Integer RecordID;
	private Integer UserID;
	private String ChatContent;
	private String ChatTime;
	public chatContent(Integer RecordID,Integer UserID,String ChatContent,String ChatTime) {
		this.RecordID=RecordID;
		this.UserID=UserID;
		this.ChatContent=ChatContent;
		this.ChatTime=ChatTime;
	}
	public Integer getRecordID() {
		return this.RecordID;
	}
	public void setRecpordID(Integer RecordID) {
		this.RecordID=RecordID;
	}
	
	public Integer getUserID() {
		return this.UserID;
	}
	public void setUserID(Integer UserID) {
		this.UserID=UserID;
	}
	
	public String getChatContent() {
		return this.ChatContent;
	}
	public void setChatContent(String ChatContent) {
		this.ChatContent=ChatContent;
	}
	
	public String getChatTime() {
		return this.ChatTime;
	}
	public void setChatTime(String ChatTime) {
		this.ChatTime=ChatTime;
	}
	
	@Override
	public String toString() {
		return "chatContent{" +
                "RecordID=" + RecordID +
                ", UserID='" + UserID + '\'' +
                ", ChatContent='" + ChatContent + '\'' +
                ", ChatTime=" + ChatTime +
                '}';
	}
}
