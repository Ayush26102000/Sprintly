public class Subtask
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = default!;
    public bool IsCompleted { get; set; }

    public Guid TaskItemId { get; set; }
    public TaskItem TaskItem { get; set; } = default!;
}
