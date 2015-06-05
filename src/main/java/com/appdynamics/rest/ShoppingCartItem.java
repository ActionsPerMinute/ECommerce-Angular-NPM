package com.appdynamics.rest;

public class CartItem {

	// No Argument Constructor
	public CartItem() {
	}

	// Argument Constructor
	public CartItem(String id, String title, String imagePath, String price,String itemid) {
		super();
		this.id = id;
		this.title = title;
		this.imagePath = imagePath;
		this.price = price;
		this.itemid = itemid;
	}

	// Private fields
	private String id;
	private String title;
	private String imagePath;
	private String price;
	private String itemid;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
}
