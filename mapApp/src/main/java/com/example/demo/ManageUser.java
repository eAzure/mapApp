package com.example.demo;

public class ManageUser {
	private Integer UserID;
	private String UserName;
	private String UserPassword;
	public ManageUser(Integer UserID,String UserName,String UserPassword) {
		this.UserID=UserID;
		this.UserName=UserName;
		this.UserPassword=UserPassword;
	}
	
	public void setUserID(Integer UserID) {
		this.UserID=UserID;
	}
	public Integer getUserID() {
		return this.UserID;
	}
	
	public void setUserName(String UserName) {
		this.UserName=UserName;
	}
	public String getUserName() {
		return this.UserName;
	}
	
	public void setUserPassword(String UserPassword) {
		this.UserPassword=UserPassword;
	}
	public String getUserPassword() {
		return this.UserPassword;
	}
	
	@Override
	public String toString() {
		return "ManageUser{" +
                "UserID=" + UserID +
                ", UserName='" + UserName + '\'' +
                ", UserPassword=" + UserPassword +
                '}';
	}
}
