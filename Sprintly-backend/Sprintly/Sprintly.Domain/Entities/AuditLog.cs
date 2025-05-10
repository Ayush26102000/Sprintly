public class AuditLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string EntityName { get; set; } = default!;
    public string ActionType { get; set; } = default!;
    public string OldValues { get; set; } = string.Empty;
    public string NewValues { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public Guid PerformedByUserId { get; set; }
    public User PerformedBy { get; set; } = default!;
}
