public class TaskItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = default!;
    public string Description { get; set; } = string.Empty;
    public TaskStatus Status { get; set; }
    public Priority Priority { get; set; }

    public Guid? AssignedToUserId { get; set; }
    public User AssignedTo { get; set; } = default!;

    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = default!;

    public Guid? SprintId { get; set; }
    public Sprint? Sprint { get; set; }

    public ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();
}
