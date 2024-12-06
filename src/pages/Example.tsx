import { useFieldArray, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers?: {
    phone: string;
  }[];
};

const errMsg = {
  firstNameErr: "Invalid First Name. Must be at least 2 characters long",
  lastNameErr: "Invalid Last Name. Must be at least 2 characters long",
  emailErr: "Invalid email. Must be a valid name@example.com",
};

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  firstName: yup.string().min(2, errMsg.firstNameErr).required(),
  lastName: yup.string().min(2, errMsg.lastNameErr).required(),
  email: yup.string().email(errMsg.emailErr).required(errMsg.emailErr),
  phoneNumbers: yup.array(
    yup.object({
      phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Bad Phone Number")
        .required(),
    }),
  ),
});

const Example = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumbers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onFormSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
          <span>{errors.firstName?.message}</span>
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
          <span>{errors.lastName?.message}</span>
        </div>
        <div>
          <label>Email</label>
          <input {...register("email")} />
          <span>{errors.email?.message}</span>
        </div>

        <button type="button" onClick={() => append({ phone: "" })}>
          Add Phone
        </button>

        <div className="field">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className="phoneNumber">
                  <input
                    placeholder="Your Phone Number"
                    type="phone"
                    {...register(`phoneNumbers.${index}.phone` as const)}
                  />
                </section>
                <span>{errors.phoneNumbers?.[index]?.phone?.message}</span>
                <button onClick={() => remove(index)}>Remove</button>
              </div>
            );
          })}
        </div>

        <div className="submit-btn">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Example;
