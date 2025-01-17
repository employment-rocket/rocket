package rocket.jobrocketbackend.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.member.entity.MemberEntity;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    List<ScheduleEntity> findByUser(MemberEntity user);

    @Query("SELECT s FROM schedule s WHERE s.user = :user " +
            "and s.state = rocket.jobrocketbackend.schedule.entity.ScheduleState.Ongoing")
    List<ScheduleEntity> findByUserAndIsNotFail(@Param("user") MemberEntity user);

    @Query("select new rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO(s.type,count(s)) " +
            "from schedule s where s.user = :user group by s.type")
    List<ScheduleGroupDTO> findByUserAndGroupByType(@Param("user") MemberEntity user);

    @Query("select new rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO(s.state,count(s)) " +
            "from schedule s where s.user = :user group by s.state")
    List<ScheduleGroupDTO> findByUserAndGroupByState(@Param("user") MemberEntity user);

    @Query("select count(s) from schedule s where s.user = :user and" +
            " s.type = rocket.jobrocketbackend.schedule.entity.ScheduleType.Document and" +
            " s.state = rocket.jobrocketbackend.schedule.entity.ScheduleState.Fail")
    Long findByUserAndTypeDocumentAndStateFailCount(@Param("user") MemberEntity user);
}
