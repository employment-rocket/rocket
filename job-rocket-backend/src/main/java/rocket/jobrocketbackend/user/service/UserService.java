package rocket.jobrocketbackend.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.user.domain.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<UserEntity> findByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
