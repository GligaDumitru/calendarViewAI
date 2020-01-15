using System;
using System.Collections.Generic;
using System.Text;

namespace AI
{
    [Serializable]
    public class Work
    {
        public App app;
        public Work(App a)
        {
            app = a;
        }

        public void PretentiosiCurs()
        {
            foreach (var teacher in app.teachers)
            {
                foreach (var line in teacher.tableColumnsForRooms)
                {
                    foreach (var CursSauSeminar in line)
                    {
                        if (CursSauSeminar[0] == true && CursSauSeminar[1] == false)
                        {
                            Console.WriteLine("Pretentios curs" + teacher.fullName);
                        }
                    }
                }
            }
        }

        public void PretentiosiLaborator()
        {
            foreach (var teacher in app.teachers)
            {
                foreach (var line in teacher.tableColumnsForRooms)
                {
                    foreach (var CursSauSeminar in line)
                    {
                        if (CursSauSeminar[0] == true && CursSauSeminar[1] == false)
                        {
                            Console.WriteLine("Pretentios curs" + teacher.fullName);
                        }
                    }
                }
            }
        }
    }
}
