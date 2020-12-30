package com.example.messagingstompwebsocket;

import lombok.Value;

@Value
public class Greeting {

	private String content;

	public Greeting(String content) {
		this.content = content;
	}
}
