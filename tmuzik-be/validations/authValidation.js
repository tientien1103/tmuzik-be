const yup = require("yup");
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const authSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRegex, "Invalid email address")
    .required(),
  password: yup.string().required(),
});

module.exports = authSchema;
