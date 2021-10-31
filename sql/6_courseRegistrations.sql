use classPlusPlus;

create table courseRegistrations (
  ID char(36) not null primary key,
  CourseID char(36) not null,
  UserID char(36) not null,
  constraint courseRegistrations_courses_ID_fk foreign key (CourseID) references courses (ID),
  constraint courseRegistrations_users_ID_fk foreign key (UserID) references users (ID)
);