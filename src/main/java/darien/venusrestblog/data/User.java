package darien.venusrestblog.data;

import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class User {
    private long id;
    private String username;
    private String email;
    private LocalDate createdAt;
    private Role role;

    public enum Role {USER, ADMIN}
}
