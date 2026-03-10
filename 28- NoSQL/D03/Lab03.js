// Create Database
use FacultySystemV2

// Create Collections + insertData
// students
db.students.insertMany([
{
 firstName:"Mahmoud",
 lastName:"MosTafa",
 isFired:false,
 facultyId:1,
 courses:[
   {courseId:1,grade:80},
   {courseId:2,grade:90}
 ]
},
{
 firstName:"Ahmed",
 lastName:"Mostafa",
 isFired:false,
 facultyId:2,
 courses:[
   {courseId:1,grade:70},
   {courseId:3,grade:85}
 ]
}
])


//Faculty
db.faculty.insertMany([
{
 _id:1,
 name:"Engineering",
 address:"Cairo"
},
{
 _id:2,
 name:"Computer Science",
 address:"Giza"
}
])


// Courses
db.courses.insertMany([
{
 _id:1,
 name:"Math",
 finalMark:100
},
{
 _id:2,
 name:"Programming",
 finalMark:100
},
{
 _id:3,
 name:"Databases",
 finalMark:100
}
])


// Display Student Full Name + Average Grade
db.students.aggregate([
{
 $project:{
   fullName:{
      $concat:["$firstName"," ","$lastName"]
   },
   avgGrade:{
      $avg:"$courses.grade"
   }
 }
}
])

// Sum Final Marks of Courses
db.courses.aggregate([{
    $group:{
    _id:null,
    sumOfmarks:{$sum:"$finalMark"}
}}])

// Relation between Student and Course
db.students.find(
 {firstName:"Mahmoud"},
 {firstName:1,courses:1,_id:0}
)


// Relation between Student and faculty
db.students.aggregate([
{
 $match:{firstName:"Mahmoud"}
},
{
 $lookup:{
    from:"faculty",
    localField:"facultyId",
    foreignField:"_id",
    as:"facultyInfo"
 }
}
])