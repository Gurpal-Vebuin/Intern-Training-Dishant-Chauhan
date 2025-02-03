const registerQuery =
  "insert into user(name,email,phone,password,roles) values(?,?,?,?,?)";

const alreadyRegisterQuery = "select email from user where email = ?";

const loginUserQuery =
  "select email, password, roles from user where email = ?";

const getUsersQuery = "select * from user";

const getParticularUserQuery = "select * from user where email = ?";

const getUserTypeQuery = "select id from user where id=?";

const deleteUserQuery = "delete from user where id=?";

export {
  registerQuery,
  alreadyRegisterQuery,
  loginUserQuery,
  getUsersQuery,
  getParticularUserQuery,
  getUserTypeQuery,
  deleteUserQuery,
};
