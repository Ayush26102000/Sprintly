public class Tenant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public string Domain { get; set; } = default!;
    public ICollection<User> Users { get; set; } = new List<User>();
}
