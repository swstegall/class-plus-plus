use classPlusPlus;

create table roles (
  ID int not null,
  Description varchar(255) not null,
  constraint roles_Description_uindex unique (Description),
  constraint roles_ID_uindex unique (ID)
);

alter table
  roles
add
  primary key (ID);

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