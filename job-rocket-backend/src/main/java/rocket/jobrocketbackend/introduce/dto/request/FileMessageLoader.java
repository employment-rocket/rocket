package rocket.jobrocketbackend.introduce.dto.request;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FileMessageLoader {
    public String loadSystemMessage(String filePath) throws IOException {
        return Files.readString(Path.of(filePath)).trim();
    }

    public List<String> loadCommands(String filePath) throws IOException {
        return Files.readAllLines(Path.of(filePath));
    }
}
