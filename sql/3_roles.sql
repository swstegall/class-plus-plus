use classPlusPlus;

create table roles (
  ID int not null primary key,
  Description varchar(255) not null
);

insert into
  roles (ID, Description)
values
  (0, 'Student');

insert into
  roles (ID, Description)
values
  (1, 'Teacher');

insert into
  roles (ID, Description)
values
  (2, 'Admin');