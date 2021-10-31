use classPlusPlus;

create table assignments (
  ID char(36) not null primary key,
  CourseID char(36) not null,
  Title varchar(255) not null,
  Description varchar(255) not null,
  DueDate datetime not null,
  constraint assignments_courses_ID_fk foreign key (CourseID) references courses (ID)
);