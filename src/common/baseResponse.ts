export const BaseResponse = ({
  data = null,
  message = null,
}: {
  data?: unknown;
  message?: string | null;
}) => {
  return {
    data,
    message,
  };
};
