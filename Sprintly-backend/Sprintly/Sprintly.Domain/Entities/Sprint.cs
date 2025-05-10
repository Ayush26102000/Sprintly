public class Sprint
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = default!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = default!;
}
