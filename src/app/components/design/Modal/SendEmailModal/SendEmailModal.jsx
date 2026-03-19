import "./SendEmailModal.css";
import * as yup from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@core/modules/mailing/api.mailing";
import ErrorMessage from "@design/Alert/ErrorMessage";

const schema = yup.object().shape({
  to: yup.string().email().required(),
  cc: yup.string().email("Invalid email").nullable(),
  subject: yup.string().required("Required"),
  message: yup.string(),
});

const SendEmailModal = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => console.log("mail send"),
  });
  const {
    control,
    handleMail,
    formState: { errors },
  } = useForm({
    defaultValues: {
      to: "",
      cc: "",
      subject: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSendMail = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSendMail(handleMail)}>
      {!!error && <ErrorMessage error={error} />}
      <Controller
        control={control}
        name="to"
        render={({ field: { onChange, value, onBlur } }) => (
          <div className="form-field">
            <label className="form-field__label" htmlFor="to">
              To
            </label>
            <input
              className={`form-field__input${errors.to ? " form-field__input--error" : ""}`}
              id="to"
              type="email"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              disabled={isPending}
              placeholder="johanna@doe.com"
              required
            />
            {errors.email && <span className="form-field__error">{errors.email.message}</span>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="cc"
        render={({ field: { onChange, value, onBlur } }) => (
          <div className="form-field">
            <label className="form-field__label" htmlFor="cc">
              Cc
            </label>
            <input
              className={`form-field__input${errors.cc ? " form-field__input--error" : ""}`}
              id="cc"
              type="email"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              disabled={isPending}
              placeholder="john@doe.com"
            />
            {errors.email && <span className="form-field__error">{errors.email.message}</span>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="subject"
        render={({ field: { onChange, value, onBlur } }) => (
          <div className="form-field">
            <label className="form-field__label" htmlFor="subject">
              Subject
            </label>
            <input
              className={`form-field__input${errors.subject ? " form-field__input--error" : ""}`}
              id="subject"
              type="text"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              disabled={isPending}
              placeholder="Add subject"
              required
            />
            {errors.email && <span className="form-field__error">{errors.email.message}</span>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, value, onBlur } }) => (
          <div className="form-field">
            <label className="form-field__label" htmlFor="description">
              Message
            </label>
            <textarea
              className={`form-field__input${errors.message ? " form-field__input--error" : ""}`}
              id="message"
              type="textarea"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              disabled={isPending}
              placeholder="Write a small message.."
            />
            {errors.email && <span className="form-field__error">{errors.email.message}</span>}
          </div>
        )}
      />
    </form>
  );
};

export default SendEmailModal;
