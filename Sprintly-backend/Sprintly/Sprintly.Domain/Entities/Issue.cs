public class Issue
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = default!;
    public string Description { get; set; } = string.Empty;
    public IssueType Type { get; set; }
    public TaskStatus Status { get; set; }

    public Guid TaskItemId { get; set; }
    public TaskItem TaskItem { get; set; } = default!;
}
