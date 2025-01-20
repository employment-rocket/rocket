package rocket.jobrocketbackend.profile.profile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import rocket.jobrocketbackend.profile.profile.entity.ProfileEntity;

public interface ProfileRepository extends MongoRepository<ProfileEntity, String> {
	Optional<ProfileEntity> findByMemberId(Long memberId);

}
