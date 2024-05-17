package com.cyber.escape.domain.notification.repository;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
// SSE연결 정보들을 DB가 아닌 Map<>에(JVM에 저장) CRUD 하는 메서드 작성
public class EmitterRepositoryImpl implements EmitterRepository {

    // emitter 저장하는 Map
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    /*
        해당 사용자에게 전송되지 못한 이벤트를 저장하는 ConcurrentHashMap이다.
        네트워크 연결이 끊기는 등의 이유로 알림이 사용자에게 전달이 되지 못했을 때 이벤트 유실을 방지하기 위해 신뢰성을 보장하고자 해당 저장소를 추가하였다.
     */
    public final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);
        log.info("NotificationService ============ save emitter completed, sseEmitter : {}", emitters.get(emitterId));
        return sseEmitter;
    }

    @Override
    public void saveEventCache(String eventCacheId, Object event){
        eventCache.put(eventCacheId, event);
    }

    @Override
    public void deleteById(String emitterId) {
        emitters.remove(emitterId);
    }

    @Override
    public Map<String, Object> findAllEventCacheStartWithId(String userUuid) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userUuid))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public Map<String, SseEmitter> findAllEmitterByIdStartWith(String userUuid) {

//        log.info("emitter check");
//        for(Map.Entry<String, SseEmitter> emt : emitters.entrySet()){
//            log.info("KEY : {}, VALUE : {} ",emt.getKey(), emt.getValue());
//        }

        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userUuid))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public List<SseEmitter> getMyEmitter(String userUuid){

        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userUuid))
                .map(Map.Entry::getValue)  // key에 대응하는 value 추출
                .collect(Collectors.toList());
    }

    public Map<String, SseEmitter> findAllEmitters(){
        return emitters.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}

