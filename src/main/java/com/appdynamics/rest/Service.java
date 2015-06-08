package com.appdynamics.rest;

import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.gson.Gson;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

;

@Path("/service")
public class Service {
	String serviceurl = "http://ec2-54-214-49-166.us-west-2.compute.amazonaws.com/appdynamicspilot/";

	@GET
	@Path("/getallitems")
	@Produces(MediaType.APPLICATION_JSON)
	public String getAllItems() throws Exception {
		Gson gson = new Gson();
		List<Item> lstProd = new ArrayList<>();
		try {
			URL url = new URL(serviceurl + "rest/items/all");
			URLConnection conn = url.openConnection();

			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(conn.getInputStream());
			NodeList nodes = doc.getElementsByTagName("product");
			for (int i = 0; i < nodes.getLength(); i++) {
				Node nNode = nodes.item(i);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					lstProd.add(new Item(eElement.getElementsByTagName("id")
							.item(0).getTextContent(), eElement
							.getElementsByTagName("title").item(0)
							.getTextContent(), serviceurl
							+ eElement.getElementsByTagName("imagePath")
									.item(0).getTextContent(), eElement
							.getElementsByTagName("price").item(0)
							.getTextContent()));
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return gson.toJson(lstProd);
	}

	@GET
	@Path("/getcartitems")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCartItems() throws Exception {
		Gson gson = new Gson();
		List<CartItem> lstCartItem = new ArrayList<>();
		try {
			URL url = new URL(serviceurl + "rest/cart/all");
			URLConnection conn = url.openConnection();

			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(conn.getInputStream());
			NodeList nodes = doc.getElementsByTagName("cart-item");
			for (int i = 0; i < nodes.getLength(); i++) {
				Node nNode = nodes.item(i);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					lstCartItem.add(new CartItem(eElement
							.getElementsByTagName("id").item(0)
							.getTextContent(), eElement
							.getElementsByTagName("title").item(0)
							.getTextContent(), serviceurl
							+ eElement.getElementsByTagName("imagePath")
									.item(0).getTextContent(), eElement
							.getElementsByTagName("price").item(0)
							.getTextContent(), eElement
							.getElementsByTagName("itemid").item(0)
							.getTextContent()));
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return gson.toJson(lstCartItem);
	}

	@GET
	@Path("/additemtocart/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public String addItemToCart(@PathParam("id") int id) throws Exception {
		Gson gson = new Gson();
		List<CartResponse> lstJsonResponse = new ArrayList<>();
		try {
			Client client = Client.create();
			WebResource wb = client.resource(serviceurl + "rest/cart/" + id);
			ClientResponse response = wb.header("username", "test").get(
					ClientResponse.class);

			// copy all the headers
			for (Entry<String, List<String>> entry : response.getHeaders()
					.entrySet()) {
				for (String value : entry.getValue()) {
					lstJsonResponse
							.add(new CartResponse(entry.getKey(), value));
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return gson.toJson(lstJsonResponse);
	}

	@GET
	@Path("/checkout")
	@Produces(MediaType.TEXT_PLAIN)
	public String CheckOutItemsFromCart() throws Exception {
		try {
			Client client = Client.create();
			WebResource wb = client.resource(serviceurl + "rest/cart/co");
			ClientResponse response = wb.header("username", "test").get(
					ClientResponse.class);
			return response.getEntity(String.class);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}