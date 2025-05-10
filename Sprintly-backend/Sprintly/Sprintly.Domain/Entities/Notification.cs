public class Notification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Message { get; set; } = default!;
    public NotificationType Type { get; set; }
    public bool IsRead { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
}
