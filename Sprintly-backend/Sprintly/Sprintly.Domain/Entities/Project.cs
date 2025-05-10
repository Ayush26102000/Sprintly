public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public string Description { get; set; } = string.Empty;

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = default!;

    public ICollection<Sprint> Sprints { get; set; } = new List<Sprint>();
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
