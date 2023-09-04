import React from "react";

interface AuthFormErrProps {
  condition: boolean | undefined;
  message: string | undefined | false;
}

const AuthFormErr: React.FC<AuthFormErrProps> = ({ condition, message }) => {
  return (
    condition && (
      <div className="text-red-500 font-medium text-xs text-right">
        {message}
      </div>
    )
  );
};

export default AuthFormErr;
