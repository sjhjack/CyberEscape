package com.cyber.escape.domain.auth.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {
	public CustomUser(
		final String username,
		final String password,
		final Collection<? extends GrantedAuthority> authorities
	){
		super(username, password, authorities);
	}

	public User toUser() {
		return this;
	}
}
