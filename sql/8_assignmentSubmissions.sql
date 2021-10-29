use classPlusPlus;

create table assignmentSubmissions (
  ID char(36) not null primary key,
  AssignmentID char(36) not null,
  UserID char(36) not null,
  File longblob not null,
  constraint assignmentSubmissions_assignments_ID_fk foreign key (AssignmentID) references assignments (ID),
  constraint assignmentSubmissions_users_ID_fk foreign key (UserID) references users (ID)
);