import "./SendEmailModal.css";
import * as yup from "yup";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@core/modules/mailing/api.mailing";
import { X, Send, Paperclip } from "lucide-react";
import useToast from "@functional/Toast/useToast";

const schema = yup.object().shape({
  to: yup.string().email("Invalid email address").required("Recipient is required"),
  cc: yup.string().email("Invalid email address").nullable(),
  subject: yup.string().required("Subject is required"),
  message: yup.string(),
});

const SendEmailModal = ({ isOpen, onClose, selectedImages = [] }) => {
  const dialogRef = useRef(null);
  const { addToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
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

  const { mutate, error, isPending } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      reset();
      onClose();
      addToast("Email sent successfully!");
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    dialogRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onSubmit = (data) => {
    mutate({
      to: data.to,
      cc: data.cc || undefined,
      subject: data.subject,
      html: data.message ? `<p>${data.message.replace(/\n/g, "<br/>")}</p>` : "<p>See attached renders.</p>",
      imagePaths: selectedImages,
    });
  };

  return (
    <div className="modal__backdrop send-email__backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="send-email__panel" ref={dialogRef} tabIndex={-1}>
        <div className="modal__header">
          <h2 className="modal__title">Send renders via email</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="send-email__attachments-info">
          <Paperclip size={14} />
          <span>
            {selectedImages.length} render{selectedImages.length !== 1 ? "s" : ""} attached
          </span>
        </div>

        {!!error && <p className="send-email__error">{error instanceof Error ? error.message : "Something went wrong"}</p>}

        <form className="send-email__form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="to"
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="send-email__field">
                <label className="send-email__label" htmlFor="send-to">
                  To <span className="send-email__required">*</span>
                </label>
                <input
                  className={`send-email__input${errors.to ? " send-email__input--error" : ""}`}
                  id="send-to"
                  type="email"
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={isPending}
                  placeholder="johanna@doe.com"
                />
                {errors.to && <span className="send-email__field-error">{errors.to.message}</span>}
              </div>
            )}
          />

          <Controller
            control={control}
            name="cc"
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="send-email__field">
                <label className="send-email__label" htmlFor="send-cc">
                  CC
                </label>
                <input
                  className={`send-email__input${errors.cc ? " send-email__input--error" : ""}`}
                  id="send-cc"
                  type="email"
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={isPending}
                  placeholder="john@doe.com"
                />
                {errors.cc && <span className="send-email__field-error">{errors.cc.message}</span>}
              </div>
            )}
          />

          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="send-email__field">
                <label className="send-email__label" htmlFor="send-subject">
                  Subject <span className="send-email__required">*</span>
                </label>
                <input
                  className={`send-email__input${errors.subject ? " send-email__input--error" : ""}`}
                  id="send-subject"
                  type="text"
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={isPending}
                  placeholder="Room design renders"
                />
                {errors.subject && <span className="send-email__field-error">{errors.subject.message}</span>}
              </div>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="send-email__field">
                <label className="send-email__label" htmlFor="send-message">
                  Message
                </label>
                <textarea
                  className={`send-email__input send-email__textarea${errors.message ? " send-email__input--error" : ""}`}
                  id="send-message"
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={isPending}
                  placeholder="Write a message..."
                  rows={3}
                />
              </div>
            )}
          />

          <div className="send-email__footer">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose} disabled={isPending}>
              Cancel
            </button>
            <button type="submit" className="send-email__btn-send" disabled={isPending}>
              <Send size={14} />
              {isPending ? "Sending..." : "Send email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailModal;
