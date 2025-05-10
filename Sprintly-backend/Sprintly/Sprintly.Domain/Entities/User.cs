public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public RoleType Role { get; set; }

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = default!;
}
