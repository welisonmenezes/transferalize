using System.ComponentModel.DataAnnotations;

public class ExampleModel
{
    [Required]
    [StringLength(10, ErrorMessage = "Name is too long.")]
    public string Name { get; set; }

    [Required]
    public string Birthdate { get; set; }

    [Required]
    public string Number { get; set; }
}