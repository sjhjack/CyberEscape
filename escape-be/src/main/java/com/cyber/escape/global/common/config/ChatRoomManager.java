package com.cyber.escape.global.common.config;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatRoomManager {
    private final ConcurrentHashMap<String, Set<String>> roomSessionMap = new ConcurrentHashMap<>();

    public void joinRoom(String roomUuid, String sessionId) {
        roomSessionMap.computeIfAbsent(roomUuid, k -> new HashSet<>())
                .add(sessionId);
    }

    public void leaveRoom(String roomUuid, String sessionId) {
        Set<String> sessions = roomSessionMap.get(roomUuid);
        if (sessions != null) {
            sessions.remove(sessionId);
            if (sessions.isEmpty()) {
                roomSessionMap.remove(roomUuid);
            }
        }
    }

    public Set<String> getUsersInRoom(String roomId) {
        return roomSessionMap.getOrDefault(roomId, new HashSet<>());
    }

    public boolean isUserInRoom(String roomUuId, String sessionId) {
        Set<String> sessions = roomSessionMap.get(roomUuId);
        return sessions != null && sessions.contains(sessionId);
    }
}