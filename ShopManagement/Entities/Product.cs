using System.ComponentModel.DataAnnotations;

namespace ShopManagement.Entities
{
    public class Product
    {
        [Key]
        public int Product_Id { get; set; }

        [Required]
        public string Product_Name { get; set; }

        [Required]
        public int Product_Quantity { get; set; }

        public List<Sale>? Sales { get; set; }
    }
}
