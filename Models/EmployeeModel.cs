using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcRestApi.Models
{
    public class EmployeeModel
    {
        public int ID { get; set; }

        public string Gender { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string DateOfBirth { get; set; }
        public decimal Salary { get; set; }
        public decimal HomeTake { get; set; }
        public decimal IncomeTax { get; set; }
        public decimal NationalInsurance { get; set; }

    }
}