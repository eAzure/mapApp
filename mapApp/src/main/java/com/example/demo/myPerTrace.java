package com.example.demo;

public class myPerTrace {
	private Integer TraceID;
	private String Longitude;
	private String Latitude;
	private String TheFirstDate;
	
	public myPerTrace(Integer TraceID,String Longitude,String Latitude,String TheFirstDate) {
		this.TraceID=TraceID;
		this.Longitude=Longitude;
		this.Latitude=Latitude;
		this.TheFirstDate=TheFirstDate;
	}
	
	public void setTraceID(Integer TraceID) {
		this.TraceID=TraceID;
	}
	public Integer getTraceID() {
		return this.TraceID;
	}
	
	public void setLongitude(String Longitude) {
		this.Longitude=Longitude;
	}
	public String getLongitude() {
		return this.Longitude;
	}
	
	public void setLatitude(String Latitude) {
		this.Latitude=Latitude;
	}
	public String getLatitude() {
		return this.Latitude;
	}
	
	public void setTheFirstDate(String TheFirstDate) {
		this.TheFirstDate=TheFirstDate;
	}
	public String getTheFirstDate() {
		return this.TheFirstDate;
	}
	@Override
	public String toString() {
		return "myPerTrace{" +
                "TraceID=" + TraceID +
                ", Longitude='" + Longitude + '\'' +
                ", Latitude='" + Latitude + '\'' +
                ", TheFirstDate=" + TheFirstDate +
                '}';
	}
}
