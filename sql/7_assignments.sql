use classPlusPlus;

create table assignments (
  ID char(36) not null,
  CourseID char(36) not null,
  Title varchar(255) not null,
  Description varchar(255) not null,
  DueDate datetime not null,
  constraint assignments_CourseID_uindex unique (CourseID),
  constraint assignments_ID_uindex unique (ID),
  constraint assignments_courses_ID_fk foreign key (CourseID) references courses (ID)
);

alter table
  assignments
add
  primary key (ID);