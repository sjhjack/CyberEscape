package com.cyber.escape.domain.notification.service;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.notification.repository.EmitterRepositoryImpl;
import com.cyber.escape.domain.notification.repository.NotifyRepository;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.net.ssl.SSLException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    // ms로 계산, 60L (1분) * 60 * 1000 = 1시간
    private static final Long DEFAULT_TIMEOUT = 60L * 60 * 1000;
    private final EmitterRepositoryImpl emitterRepository;
    // CRUD, FIND, 동적 쿼리 
    private final NotifyRepository notifyRepository;
    private final UserRepository userRepository;
    // 복잡한 수준 쿼리, 세밀한 제어에는 TEMPLATE 사용
    private final MongoTemplate mongoTemplate;
    private final UserUtil userUtil;

    // subscribe
    public SseEmitter subscribe(String lastEventId){
        try {
            String userUuid = userUtil.getLoginUserUuid();
            log.info("NotificationService ============ start subscribe..");
            String id = userUuid + "_" + System.currentTimeMillis();
            log.info("NotificationService ============ id : {}, lastEventId: {}", id, lastEventId);
            SseEmitter sseEmitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

            log.info("NotificationService ============ save emitter completed");

            // 시간이 만료된 경우에 대해 자동으로 레포지토리에서 삭제 처리해줄 수 있는 콜백을 등록해놓을 수 있다.
            // onCompletion()에 정의한 콜백함수가 SseEmitter를 관리하는 다른 스레드에서 실행된다는 것이다.
            sseEmitter.onCompletion(() -> {
                log.info(":::::::::::::::: EMITTER COMPLETE!!!!");
                emitterRepository.deleteById(id);
            });
            sseEmitter.onTimeout(() -> {
                log.info(":::::::::::::::: EMITTER TIME!!!!");
                emitterRepository.deleteById(id);
            });
            sseEmitter.onError((e) -> {

                log.info(":::::::::::::::: EMITTER ERROR!!!!");
                emitterRepository.deleteById(id);
            });
            // sseEmitter.onError();

            log.info("SSE DATA : {}", sseEmitter.toString());

            // sendToClient(sseEmitter, id, "EventStream Created. memberId = {" + memberId + "}");
            sendToClient(sseEmitter, id, "SSE 구독 요청이 완료되었습니다.");
            log.info("NotificationService ============ sendToClient completed");

            // 클라이언트가 미수신한 알림에 대해 전송
            if (!lastEventId.isEmpty()) {
                Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(userUuid));
                events.entrySet().stream()
                        .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                        .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
            }

            return sseEmitter;
        }
        catch (Exception e){
            log.error(e.getMessage());
        }
        return null;
    }

    // 알림이 필요한 곳에서 이 함수를 호출하면 됩니다.
    // 이걸 불러봤자... 결국 subscribe에서만 되겠구나
    // subscribe 자체가 그냥 등록만 하는 거니까
    public void send(String receiverUuid, String roomUuid, Notify.NotificationType notificationType, String content){
        log.info("NotificationService ============= send() 시작");

        // 알림 내역 저장
        String senderUuid = userUtil.getLoginUserUuid();

        log.info("RECEIVER UUID : {}", receiverUuid);
        log.info("NOTIFYCATION : {}", notificationType);

        // 친구 요청이라면
        if(notificationType.equals(Notify.NotificationType.FRIEND)) {
            // sender가 receiver에게 친구 요청을 보낸 적이 있는지를 판별
            log.info("::::::::::::::: 친구 요청입니다.");
            List<Notify> existNotification = notifyRepository.findBySenderUuidAndReceiverUuidAndNotificationTypeAndIsRead(senderUuid, receiverUuid, Notify.NotificationType.FRIEND, 'F');
            sendNotification(receiverUuid, "", notificationType, content, senderUuid, existNotification);
        }
        // 게임 요청이 들어왔다면
        else {
            log.info("::::::::::::::: 게임 초대 요청입니다.");
            // A 유저가 B 유저로 보낸, 아직 안 읽은 요청이 있는 경우는 안 온다.
            List<Notify> existNotification = notifyRepository.findBySenderUuidAndReceiverUuidAndRoomUuidAndIsRead(senderUuid, receiverUuid, roomUuid, 'F');
            sendNotification(receiverUuid, roomUuid, notificationType, content, senderUuid, existNotification);
        }
        log.info("NotificationService ============= send() 끝");

    }

    private void sendNotification(String receiverUuid, String roomUuid, Notify.NotificationType notificationType, String content, String senderUuid, List<Notify> existNotification)
    {

        // 게임의 경우 있어도, 최신의 것을
        try {
            if (existNotification.isEmpty()) {

                // roomUuid 자리는 비워 놓는다.
                User user = userRepository.findUserByUuid(userUtil.getLoginUserUuid()).orElseThrow(() -> new UserException(ExceptionCodeSet.USER_NOT_FOUND));
                Notify notification = notifyRepository.save(createNotify(senderUuid, receiverUuid, user.getNickname(), user.getProfileUrl(), roomUuid, notificationType, content));
                log.info("::::::::::::::::::::::::::::::::::  알림 요청 ");
                // Notify notification = createNotify(receiverId, notificationType, content);

                // receiver = 현재 로그인 한 유저 = 알림 받을 사람
                // String receiverId = receiver.getMemberId();

                // 해당 객체에 엮인 sseEmitter 객체를 찾는다.
                Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterByIdStartWith(String.valueOf(receiverUuid));

                try {
                    sseEmitters.forEach(
                        (key, sseEmitter) -> {
                            log.info("KEY : {}, Emitter : {}", key, sseEmitter);
                            emitterRepository.saveEventCache(key, notification);
                            if (notificationType.equals(Notify.NotificationType.FRIEND)) {
                                sendToClient(sseEmitter, key, NotifyDto.FriendResponse.from(notification));
                            } else {
                                sendToClient(sseEmitter, key, NotifyDto.GameResponse.from(notification));
                            }
                        }
                    );

                }
                catch (Exception e){
                    log.info("::::::::::::::: SEND ERROR입니다. {}", e.getMessage());
                }
            }
        }
        catch (Exception e) {
            log.info("EXCETION : {}", e.getMessage());
        }
    }

    private Notify createNotify(String senderUuid, String receiverUuid, String nickname, String profileUrl,
                                String roomUuid, Notify.NotificationType notificationType, String content) {
        // Todo : sender 있는 경우, 없는 경우 나누기
        return Notify.builder()
                .senderUuid(senderUuid)
                .receiverUuid(receiverUuid)
                .roomUuid(roomUuid)
                .nickname(nickname)
                .profileUrl(profileUrl)
                .notificationType(notificationType)
                .content(content)
                .isRead('F')
                .createdAt(LocalDateTime.of(
                    LocalDateTime.now().getYear(),
                    LocalDateTime.now().getMonth(),
                    LocalDateTime.now().getDayOfMonth(),
                    LocalDateTime.now().getHour(),
                    LocalDateTime.now().getMinute()
                ))
                .build();
    }

    // 호출을 안해..
    private void sendToClient(SseEmitter sseEmitter, String id, Object data){
        try{
            log.info("sendToClient ============ sendToClient start");
            log.info("sseEmitter INFO : {}", sseEmitter);
            SseEmitter.SseEventBuilder event = SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data);
                    //.reconnectTime(DEFAULT_TIMEOUT);
            sseEmitter.send(event);
            log.info("sendToClient ============ sendToClient completed");
        } catch (IOException e){ // 연결이 끊기거나 네트워크가 불안정한 경우
            log.info("sendToClient ============ sendToClient failed");
            //throw new SSLException();
            sseEmitter.completeWithError(e); // error가 나서 sseEmitter가 삭제
            emitterRepository.deleteById(id);
            log.error("알림을 송신하는 도중 에러가 발생했습니다 : {}", e.getMessage());
            //throw new SseException(e);
        }
        catch (Exception e){
            log.error("ERROR : {}", e.getMessage());
        }

        //sseEmitter.complete();
    }

    // 안 읽은 목록들 추출
    public List<Object> getNotifyList(){
        String userUuid = userUtil.getLoginUserUuid();
        List<Notify> notifyList = notifyRepository.findByReceiverUuidAndIsReadOrderByCreatedAt(userUuid, 'F');
        List<Object> response = new ArrayList<>();
        boolean isFirst = false;

        for(Notify notify : notifyList){
            if(notify.getNotificationType().equals(Notify.NotificationType.FRIEND)){
                response.add(NotifyDto.FriendResponse.from(notify));
            }
            else if(notify.getNotificationType().equals(Notify.NotificationType.GAME)) {
                if (!isFirst) {
                    response.add(NotifyDto.GameResponse.from(notify));
                    isFirst = true;
                }
            }
        }

        return response;
    }

    // mongoDB에서 read 처리 지정
    public void markAsRead(ObjectId objectId){
        //for(ObjectId objectId : objectIdList){
            log.info("objectId : " + objectId);
            Notify unreadNotify = notifyRepository.findById(objectId)
                    .orElseThrow(() -> new RuntimeException("Document를 찾을 수 없습니다."));

            Notify readNotify = Notify.builder()
                    .id(unreadNotify.getId())
                    .senderUuid(unreadNotify.getSenderUuid())
                    .receiverUuid(unreadNotify.getReceiverUuid())  // Maintain other fields
                    .nickname(unreadNotify.getNickname())
                    .content(unreadNotify.getContent())      	// Maintain other fields
                    .notificationType(unreadNotify.getNotificationType())  // Maintain other fields
                    .isRead('T')  // Mark as read
                    .createdAt(unreadNotify.getCreatedAt())  	// Maintain other fields
                    .build();

            mongoTemplate.save(readNotify);
        //}
    }

    public List<SseEmitter> getMyEmitter(){
        String userUuid = userUtil.getLoginIdFromContextHolder();
        return emitterRepository.getMyEmitter(userUuid);
    }


    @Scheduled(fixedRate = 180000) // 3분마다 heartbeat 메세지 전달.
    public void sendHeartbeat() {
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitters();
        sseEmitters.forEach((key, emitter) -> {
            try {
                emitter.send(SseEmitter.event().id(key).name("heartbeat").data(""));
                log.info("하트비트 메세지 전송");
            } catch (IOException e) {
                emitterRepository.deleteById(key);
                log.error("하트비트 전송 실패: {}", e.getMessage());
            }
        });
    }
}
