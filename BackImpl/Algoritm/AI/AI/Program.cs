using System;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace AI
{
    class Program
    {
        static void Main(string[] args)
        {
            string jsonPath = @"D:\Iulian\Files\Facultate\An 3\Sem I\AI\Proiect Final\AI\AI\db.txt";
            AppDataAccess mDataAccess = new AppDataAccess();
            Work work = new Work(mDataAccess.Read<App>(jsonPath));
            work.PretentiosiCurs();
            work.PretentiosiLaborator();
        }
    }

    [Serializable]
    public class App
    {
        public List<Room> rooms { get; set; }
        public List<Teacher> teachers { get; set; }
        public List<WeekDay> weekDays { get; set; }
        public Profile profile { get; set; }
    }
    [Serializable]
    public class Room
    {
        public int id { get; set; }
        public string name { get; set; }
        public string floor { get; set; }
        public string type { get; set; }
        public int size { get; set; }
        public List<List<bool>> intervalDetails { get; set; }
    }
    [Serializable]
    public class Teacher
    {
        public string lName { get; set; }
        public string fName { get; set; }
        public string email { get; set; }
        public string fullName { get; set; }
        public List<string> subject { get; set; }
        public List<int> numberOfCourses { get; set; }
        public List<int> numerOfSeminaries { get; set; }
        public int posibleCourse { get; set; }
        public int posibleSeminaries { get; set; }
        public int totalSelectedInterval { get; set; }
        public int totalSelectedIntervalEmpty { get; set; }
        public int totalSelectedIntervalFull { get; set; }
        public int totalSelectedIntervalHalf { get; set; }
        public List<List<string>> tableColumnsForIntervals { get; set; }
        public List<List<List<bool>>> tableColumnsForRooms { get; set; }
        public List<List<List<string>>> tableColumsForClasses { get; set; }
        public int id { get; set; }
    }
    [Serializable]
    public class AvailableRoom
    {
        public string name { get; set; }
    }
    [Serializable]
    public class WeekDay
    {
        public int id { get; set; }
        public string name { get; set; }
        public int start { get; set; }
        public int end { get; set; }
        public List<object> closed { get; set; }
        public List<AvailableRoom> availableRooms { get; set; }
    }
    [Serializable]
    public class Profile
    {
        public string name { get; set; }
    }
}
