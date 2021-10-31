use classPlusPlus;

create table users (
  ID char(36) not null primary key,
  RoleID int not null,
  FirstName varchar(255) not null,
  LastName varchar(255) not null,
  Grade varchar(255) not null,
  constraint users_credentials_ID_fk foreign key (ID) references credentials (ID),
  constraint users_roles_ID_fk foreign key (RoleID) references roles (ID)
);