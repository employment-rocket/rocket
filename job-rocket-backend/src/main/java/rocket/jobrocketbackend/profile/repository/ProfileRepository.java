package rocket.jobrocketbackend.profile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import rocket.jobrocketbackend.profile.entity.ProfileEntity;

public interface ProfileRepository extends MongoRepository<ProfileEntity, String> {
	Optional<ProfileEntity> findByMemberId(Long memberId);
	List<ProfileEntity> findAllByIsPublic(boolean isPublic);
	Page<ProfileEntity> findAllByIsPublic(boolean isPublic, Pageable pageable);
}
