package com.cyber.escape.domain.auth.security;

import java.security.Principal;

public class StompPrincipal implements Principal {
	private String name;

	public StompPrincipal(final String name) {
		this.name = name;
	}

	@Override
	public String getName() {
		return name;
	}
}
