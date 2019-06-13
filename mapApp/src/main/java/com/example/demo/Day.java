package com.example.demo;

public class Day {
	private String Day;
	public Day(String Day) {
		this.Day=Day;
	}
	public void setDay(String Day) {
		this.Day=Day;
	}
	public String getDay() {
		return this.Day;
	}
	@Override
	public String toString() {
		return "Day{" + 
                "Day=" + Day +
                '}';
	}
}
