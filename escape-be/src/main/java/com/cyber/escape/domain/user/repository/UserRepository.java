package com.cyber.escape.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cyber.escape.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findUserByUuid(String uuid);
	Optional<User> findUserById(Long id);
	List<User> findByNicknameContainingIgnoreCase(String nickname);

	@Query("SELECT u FROM User u WHERE u.uuid IN :uuids")
	Optional<List<User>> findByUuids(@Param("uuids") List<String> uuids);

	boolean existsByNickname(String nickname);

	Optional<User> findByLoginId(String loginId);
	boolean existsByLoginId(String loginId);
}
