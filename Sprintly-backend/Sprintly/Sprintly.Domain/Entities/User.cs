public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public int RoleId { get; set; }

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = default!;
}
