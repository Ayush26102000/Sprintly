namespace ProjectPilot.Application.DTOs.Users
{
    public class CreateUserDto
    {
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public int RoleId { get; set; }
        public Guid TenantId { get; set; }
        public Guid AssignedUserId { get; set; }
    }

    public class UpdateUserDto
    {
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public int RoleId { get; set; }
        public Guid TenantId { get; set; }
    }

    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public int RoleId { get; set; }
        public Guid TenantId { get; set; }
        public string TenantName { get; set; } = default!;
    }
}
