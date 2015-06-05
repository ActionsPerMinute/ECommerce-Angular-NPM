package com.appdynamics.rest;

public class JsonResponse {

	// No Argument Constructor
	public JsonResponse() {
	}

	// Argument Constructor
	public JsonResponse(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}

	// Private fields
	private String key;
	
	//Getter and Setter of key
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	//Getter and Setter of value
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	private String value;

	
}
