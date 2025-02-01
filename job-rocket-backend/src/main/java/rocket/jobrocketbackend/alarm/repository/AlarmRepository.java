package rocket.jobrocketbackend.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;


public interface AlarmRepository extends JpaRepository<AlarmEntity, Long> {

 // @Query("SELECT a FROM alarm a JOIN FETCH a.user WHERE a.user.id = :userId")
  //  List<AlarmEntity> findByUserId(@Param(value = "userId") Long userId);


    List<AlarmEntity> findByUserId(Long memberId);
}
