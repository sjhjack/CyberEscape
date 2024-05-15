package com.cyber.escape.domain.notification.service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cyber.escape.domain.notification.document.Notify;
import com.cyber.escape.domain.notification.dto.NotifyDto;
import com.cyber.escape.domain.notification.repository.EmitterRepositoryImpl;
import com.cyber.escape.domain.notification.repository.NotifyRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.IdFinder;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    // ms로 계산, 60L (1분) * 60 * 1000 = 1시간
    private static final Long DEFAULT_TIMEOUT = 180000L;
    private final EmitterRepositoryImpl emitterRepository;
    // CRUD, FIND, 동적 쿼리 
    private final NotifyRepository notifyRepository;
    // 복잡한 수준 쿼리, 세밀한 제어에는 TEMPLATE 사용
    private final MongoTemplate mongoTemplate;
    private final UserUtil userUtil;

    // subscribe
    public SseEmitter subscribe(String lastEventId){
        String userUuid = userUtil.getLoginIdFromContextHolder();
        log.info("NotificationService ============ start subscribe..");
        String id = userUuid + "_" + System.currentTimeMillis();
        log.info("NotificationService ============ id : {}, lastEventId: {}", id, lastEventId);
        SseEmitter sseEmitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        log.info("NotificationService ============ save emitter completed");

        // 시간이 만료된 경우에 대해 자동으로 레포지토리에서 삭제 처리해줄 수 있는 콜백을 등록해놓을 수 있다.
        sseEmitter.onCompletion(() -> emitterRepository.deleteById(id));
        sseEmitter.onTimeout(() -> emitterRepository.deleteById(id));
        sseEmitter.onError((e) -> emitterRepository.deleteById(id));
        // sseEmitter.onError();

        log.info("SSE DATA : {}", sseEmitter.toString());

        // sendToClient(sseEmitter, id, "EventStream Created. memberId = {" + memberId + "}");
        sendToClient(sseEmitter, id, "SSE 구독 요청이 완료되었습니다.");
        log.info("NotificationService ============ sendToClient completed");

        // 클라이언트가 미수신한 알림에 대해 전송
        if(!lastEventId.isEmpty()){
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(userUuid));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return sseEmitter;
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
            List<Notify> existNotification = notifyRepository.findBySenderUuidAndReceiverUuidAndNotificationType(senderUuid, receiverUuid, Notify.NotificationType.FRIEND);
            sendNotifcation(receiverUuid, "", notificationType, content, senderUuid, existNotification);
        }
        // 게임 요청이 들어왔다면
        else {
            log.info("::::::::::::::: 게임 초대 요청입니다.");
            List<Notify> existNotification = notifyRepository.findBySenderUuidAndReceiverUuidAndNotificationType(senderUuid, receiverUuid, Notify.NotificationType.GAME);
            sendNotifcation(receiverUuid, roomUuid, notificationType, content, senderUuid, existNotification);
        }
        log.info("NotificationService ============= send() 끝");

    }

    private void sendNotifcation(String receiverUuid, String roomUuid, Notify.NotificationType notificationType, String content, String senderUuid, List<Notify> existNotification) {
        try {
            if (existNotification.isEmpty()) {

                // roomUuid 자리는 비워놓는다.
                //저장 확인
                Notify notification = notifyRepository.save(createNotify(senderUuid, receiverUuid, roomUuid, notificationType, content));
                log.info("::::::::::::::::::::::::::::::::::  친구 요청 ");
                // Notify notification = createNotify(receiverId, notificationType, content);

                // receiver = 현재 로그인 한 유저 = 알림 받을 사람
                // String receiverId = receiver.getMemberId();

                // 해당 객체에 엮인 sseEmitter 객체를 찾는다.
                Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterByIdStartWith(String.valueOf(receiverUuid));

                if (sseEmitters.get(String.valueOf(receiverUuid)) == null) {
                    String userUuid = userUtil.getLoginUserUuid();
                    log.info("NotificationService ============ start subscribe..");
                    String id = userUuid + "_" + System.currentTimeMillis();
                    log.info("NotificationService ============ id : {}, lastEventId: {}", id, "");
                    SseEmitter sseEmitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));
                    emitterRepository.saveEventCache(id, notification);
                    sendToClient(sseEmitter, id, NotifyDto.FriendResponse.from(notification));
                }

                sseEmitters.forEach(
                        (key, sseEmitter) -> {
                            emitterRepository.saveEventCache(key, notification);
                            sendToClient(sseEmitter, key, NotifyDto.FriendResponse.from(notification));
                        }
                );
            }
        }
        catch (Exception e) {
            log.info("EXCETION : {}", e.getMessage());
        }
    }

    private Notify createNotify(String senderUuid, String receiverUuid, String roomUuid, Notify.NotificationType notificationType, String content) {
        // Todo : sender 있는 경우, 없는 경우 나누기
        return Notify.builder()
                .senderUuid(senderUuid)
                .receiverUuid(receiverUuid)
                .roomUuid(roomUuid)
                .nickname(userUtil.getLoginUser().getNickname())
                .notificationType(notificationType)
                .content(content)
                .isRead('F')
                .build();
    }

    private void sendToClient(SseEmitter sseEmitter, String id, Object data){
        try{
            log.info("sendToClient ============ sendToClient start");
            log.info("sseEmitter INFO : {}", sseEmitter);
            sseEmitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data));
            //sseEmitter.complete();
            log.info("sendToClient ============ sendToClient completed");
        } catch (IOException e){
            log.info("sendToClient ============ sendToClient failed");
            sseEmitter.completeWithError(e);
            emitterRepository.deleteById(id);
            log.error("알림을 송신하는 도중 에러가 발생했습니다 : {}", e.getMessage());
            throw new RuntimeException("연결 오류");
        }
        catch (Exception e){
            log.error("ERROR : {}", e.getMessage());
        }
    }

    // 안 읽은 목록들 추출
    public List<Object> getNotifyList(){
        String userUuid = userUtil.getLoginUserUuid();
        List<Notify> notifyList = notifyRepository.findByReceiverUuidAndIsRead(userUuid, 'F');

        List<Object> response = new ArrayList<>();

        for(Notify notify : notifyList){
            if(notify.getNotificationType().equals(Notify.NotificationType.FRIEND)){
                response.add(NotifyDto.FriendResponse.from(notify));
            }
            else if(notify.getNotificationType().equals(Notify.NotificationType.GAME)){
                response.add(NotifyDto.GameResponse.from(notify));
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
}
